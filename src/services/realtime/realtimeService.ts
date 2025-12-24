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
      this.unsubscribe(channelName);
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        { event, schema, table, filter },
        (payload: RealtimePostgresChangesPayload<T>) => onPayload(payload),
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  unsubscribe(channelName: string): void {
    const channel = this.channels.get(channelName);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(channelName);
    }
  }

  unsubscribeAll(): void {
    this.channels.forEach(channel => channel.unsubscribe());
    this.channels.clear();
  }
}

export const realtimeService = new RealtimeService();
