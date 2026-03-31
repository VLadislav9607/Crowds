import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { SubscriptionConfig } from './types';

class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribe<T extends Record<string, unknown>>(
    config: SubscriptionConfig<T>,
  ): RealtimeChannel {
    const {
      channelName,
      table,
      schema = 'public',
      event = '*',
      filter,
      onPayload,
    } = config;

    if (this.channels.has(channelName)) {
      console.log('[RT] Channel already exists, removing:', channelName);
      const existing = this.channels.get(channelName)!;
      supabase.removeChannel(existing);
      this.channels.delete(channelName);
    }

    console.log('[RT] Creating channel:', channelName, 'table:', table, 'filter:', filter);
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        { event, schema, table, filter },
        (payload: RealtimePostgresChangesPayload<T>) => onPayload(payload),
      )
      .subscribe((status: string) => {
        console.log('[RT] Channel status:', channelName, status);
      });

    this.channels.set(channelName, channel);
    return channel;
  }

  unsubscribe(channelName: string): void {
    const channel = this.channels.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelName);
    }
  }

  unsubscribeAll(): void {
    this.channels.forEach(channel => supabase.removeChannel(channel));
    this.channels.clear();
  }
}

export const realtimeService = new RealtimeService();
