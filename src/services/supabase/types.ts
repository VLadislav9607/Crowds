export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      black_flag_reports: {
        Row: {
          created_at: string;
          description: string;
          event_id: string | null;
          id: string;
          reporter_org_id: string | null;
          reporter_talent_id: string | null;
          reporter_type: string;
          reporter_user_id: string;
          status: string;
          target_org_id: string | null;
          target_talent_id: string | null;
          target_type: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          event_id?: string | null;
          id?: string;
          reporter_org_id?: string | null;
          reporter_talent_id?: string | null;
          reporter_type: string;
          reporter_user_id: string;
          status?: string;
          target_org_id?: string | null;
          target_talent_id?: string | null;
          target_type: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          event_id?: string | null;
          id?: string;
          reporter_org_id?: string | null;
          reporter_talent_id?: string | null;
          reporter_type?: string;
          reporter_user_id?: string;
          status?: string;
          target_org_id?: string | null;
          target_talent_id?: string | null;
          target_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'black_flag_reports_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'black_flag_reports_reporter_talent_id_fkey';
            columns: ['reporter_talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'black_flag_reports_target_talent_id_fkey';
            columns: ['target_talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      brands: {
        Row: {
          created_at: string;
          id: string;
          logo_path: string | null;
          name: string;
          organization_network_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          logo_path?: string | null;
          name: string;
          organization_network_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          logo_path?: string | null;
          name?: string;
          organization_network_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'brands_organization_network_id_fkey';
            columns: ['organization_network_id'];
            isOneToOne: false;
            referencedRelation: 'organizations_network';
            referencedColumns: ['id'];
          },
        ];
      };
      capabilities: {
        Row: {
          capability_category: Database['public']['Enums']['СapabilityСategory'];
          code: string;
          id: string;
          name: string;
          sort_order: number;
        };
        Insert: {
          capability_category: Database['public']['Enums']['СapabilityСategory'];
          code: string;
          id?: string;
          name: string;
          sort_order: number;
        };
        Update: {
          capability_category?: Database['public']['Enums']['СapabilityСategory'];
          code?: string;
          id?: string;
          name?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          chat_id: string;
          created_at: string | null;
          id: string;
          sender_id: string;
          text: string;
        };
        Insert: {
          chat_id: string;
          created_at?: string | null;
          id?: string;
          sender_id?: string;
          text: string;
        };
        Update: {
          chat_id?: string;
          created_at?: string | null;
          id?: string;
          sender_id?: string;
          text?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_chat_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_participants: {
        Row: {
          chat_id: string;
          joined_at: string | null;
          last_seen_at: string | null;
          organization_id: string | null;
          role: string;
          talent_id: string | null;
          user_id: string;
        };
        Insert: {
          chat_id: string;
          joined_at?: string | null;
          last_seen_at?: string | null;
          organization_id?: string | null;
          role: string;
          talent_id?: string | null;
          user_id: string;
        };
        Update: {
          chat_id?: string;
          joined_at?: string | null;
          last_seen_at?: string | null;
          organization_id?: string | null;
          role?: string;
          talent_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_participants_chat_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_participants_org_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_participants_talent_fkey';
            columns: ['talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      chats: {
        Row: {
          created_at: string | null;
          event_id: string;
          id: string;
          last_message_at: string | null;
          last_message_text: string | null;
          organization_id: string | null;
          talent_id: string | null;
          type: Database['public']['Enums']['chat_type'];
        };
        Insert: {
          created_at?: string | null;
          event_id: string;
          id?: string;
          last_message_at?: string | null;
          last_message_text?: string | null;
          organization_id?: string | null;
          talent_id?: string | null;
          type: Database['public']['Enums']['chat_type'];
        };
        Update: {
          created_at?: string | null;
          event_id?: string;
          id?: string;
          last_message_at?: string | null;
          last_message_text?: string | null;
          organization_id?: string | null;
          talent_id?: string | null;
          type?: Database['public']['Enums']['chat_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'chats_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chats_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chats_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      current_flags: {
        Row: {
          active_flag_id: string | null;
          expires_on: string | null;
          status: string;
          target_id: string;
          target_type: string;
        };
        Insert: {
          active_flag_id?: string | null;
          expires_on?: string | null;
          status: string;
          target_id: string;
          target_type: string;
        };
        Update: {
          active_flag_id?: string | null;
          expires_on?: string | null;
          status?: string;
          target_id?: string;
          target_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'current_flags_active_flag_id_fkey';
            columns: ['active_flag_id'];
            isOneToOne: false;
            referencedRelation: 'flags';
            referencedColumns: ['id'];
          },
        ];
      };
      custom_list_talents: {
        Row: {
          created_at: string;
          id: string;
          list_id: string;
          talent_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          list_id: string;
          talent_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          list_id?: string;
          talent_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'custom_list_talents_list_id_fkey';
            columns: ['list_id'];
            isOneToOne: false;
            referencedRelation: 'custom_lists';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'custom_list_talents_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      custom_lists: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          owner_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          owner_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'custom_lists_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'org_users';
            referencedColumns: ['id'];
          },
        ];
      };
      email_verifications: {
        Row: {
          created_at: string;
          email: string;
          expires_at: string;
          id: string;
          otp_code: string;
          verification_token: string | null;
          verified: boolean;
          verified_at: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          expires_at: string;
          id?: string;
          otp_code: string;
          verification_token?: string | null;
          verified: boolean;
          verified_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          expires_at?: string;
          id?: string;
          otp_code?: string;
          verification_token?: string | null;
          verified?: boolean;
          verified_at?: string | null;
        };
        Relationships: [];
      };
      event_age_groups: {
        Row: {
          created_at: string;
          event_id: string;
          female_count: number;
          id: string;
          male_count: number;
          max_age: number;
          min_age: number;
          other_count: number;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          female_count: number;
          id?: string;
          male_count: number;
          max_age: number;
          min_age: number;
          other_count: number;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          female_count?: number;
          id?: string;
          male_count?: number;
          max_age?: number;
          min_age?: number;
          other_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'event_age_groups_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      event_cancellations: {
        Row: {
          brand_id: string;
          cancelled_at: string;
          cancelled_by_user_id: string;
          event_id: string;
          id: string;
          reason: string | null;
        };
        Insert: {
          brand_id: string;
          cancelled_at?: string;
          cancelled_by_user_id: string;
          event_id: string;
          id?: string;
          reason?: string | null;
        };
        Update: {
          brand_id?: string;
          cancelled_at?: string;
          cancelled_by_user_id?: string;
          event_id?: string;
          id?: string;
          reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'event_cancellations_brand_id_fkey';
            columns: ['brand_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_cancellations_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      event_locations: {
        Row: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          created_at: string;
          event_id: string;
          formatted_address: string;
          id: string;
          latitude: number;
          longitude: number;
          place_id: string;
          postal_code: string | null;
          region: string;
          street_name: string | null;
          street_number: string | null;
          timezone: string;
        };
        Insert: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          created_at?: string;
          event_id: string;
          formatted_address: string;
          id?: string;
          latitude: number;
          longitude: number;
          place_id: string;
          postal_code?: string | null;
          region: string;
          street_name?: string | null;
          street_number?: string | null;
          timezone: string;
        };
        Update: {
          autocomplete_description?: string;
          city?: string;
          coords?: unknown;
          country?: string;
          created_at?: string;
          event_id?: string;
          formatted_address?: string;
          id?: string;
          latitude?: number;
          longitude?: number;
          place_id?: string;
          postal_code?: string | null;
          region?: string;
          street_name?: string | null;
          street_number?: string | null;
          timezone?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_locations_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: true;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      event_participant_qr_sessions: {
        Row: {
          checked_in_at: string | null;
          checked_out_at: string | null;
          created_at: string;
          event_id: string;
          id: string;
          participant_id: string;
          qr_code_id: string;
        };
        Insert: {
          checked_in_at?: string | null;
          checked_out_at?: string | null;
          created_at?: string;
          event_id: string;
          id?: string;
          participant_id: string;
          qr_code_id: string;
        };
        Update: {
          checked_in_at?: string | null;
          checked_out_at?: string | null;
          created_at?: string;
          event_id?: string;
          id?: string;
          participant_id?: string;
          qr_code_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_participant_qr_sessions_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_participant_qr_sessions_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'event_participations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_participant_qr_sessions_qr_code_id_fkey';
            columns: ['qr_code_id'];
            isOneToOne: false;
            referencedRelation: 'event_qr_codes';
            referencedColumns: ['id'];
          },
        ];
      };
      event_participants: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          event_id: string;
          id: string;
          talent_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          event_id: string;
          id?: string;
          talent_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          event_id?: string;
          id?: string;
          talent_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_participants_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_participants_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      event_participations: {
        Row: {
          created_at: string;
          event_id: string;
          id: string;
          initiated_by: Database['public']['Enums']['participation_initiator'];
          org_user_id: string;
          rejected_by:
            | Database['public']['Enums']['participation_initiator']
            | null;
          status: Database['public']['Enums']['participation_status'];
          talent_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          id?: string;
          initiated_by: Database['public']['Enums']['participation_initiator'];
          org_user_id: string;
          rejected_by?:
            | Database['public']['Enums']['participation_initiator']
            | null;
          status: Database['public']['Enums']['participation_status'];
          talent_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          id?: string;
          initiated_by?: Database['public']['Enums']['participation_initiator'];
          org_user_id?: string;
          rejected_by?:
            | Database['public']['Enums']['participation_initiator']
            | null;
          status?: Database['public']['Enums']['participation_status'];
          talent_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_participations_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_participations_org_user_id_fkey';
            columns: ['org_user_id'];
            isOneToOne: false;
            referencedRelation: 'org_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_participations_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_accents: {
        Row: {
          id: string;
          preference_id: string;
          value: Database['public']['Enums']['Accent'];
        };
        Insert: {
          id?: string;
          preference_id: string;
          value: Database['public']['Enums']['Accent'];
        };
        Update: {
          id?: string;
          preference_id?: string;
          value?: Database['public']['Enums']['Accent'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_accents_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_body_attributes: {
        Row: {
          preference_id: string;
          value: Database['public']['Enums']['BodyAttributes'];
        };
        Insert: {
          preference_id: string;
          value: Database['public']['Enums']['BodyAttributes'];
        };
        Update: {
          preference_id?: string;
          value?: Database['public']['Enums']['BodyAttributes'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_body_attributes_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_ethnicities: {
        Row: {
          id: string;
          preference_id: string;
          value: Database['public']['Enums']['Ethnicity'];
        };
        Insert: {
          id?: string;
          preference_id: string;
          value: Database['public']['Enums']['Ethnicity'];
        };
        Update: {
          id?: string;
          preference_id?: string;
          value?: Database['public']['Enums']['Ethnicity'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_ethnicities_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_eye_colors: {
        Row: {
          id: string;
          preference_id: string;
          value: Database['public']['Enums']['EyeColour'];
        };
        Insert: {
          id?: string;
          preference_id: string;
          value: Database['public']['Enums']['EyeColour'];
        };
        Update: {
          id?: string;
          preference_id?: string;
          value?: Database['public']['Enums']['EyeColour'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_eye_colors_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_facial_attributes: {
        Row: {
          preference_id: string;
          value: Database['public']['Enums']['FacialAttributes'];
        };
        Insert: {
          preference_id: string;
          value: Database['public']['Enums']['FacialAttributes'];
        };
        Update: {
          preference_id?: string;
          value?: Database['public']['Enums']['FacialAttributes'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_facial_attributes_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_hair_colors: {
        Row: {
          id: string;
          preference_id: string;
          value: Database['public']['Enums']['HairColour'];
        };
        Insert: {
          id?: string;
          preference_id: string;
          value: Database['public']['Enums']['HairColour'];
        };
        Update: {
          id?: string;
          preference_id?: string;
          value?: Database['public']['Enums']['HairColour'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_hair_colors_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_skin_tones: {
        Row: {
          preference_id: string;
          value: Database['public']['Enums']['SkinTone'];
        };
        Insert: {
          preference_id: string;
          value: Database['public']['Enums']['SkinTone'];
        };
        Update: {
          preference_id?: string;
          value?: Database['public']['Enums']['SkinTone'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_skin_tones_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preference_tattoo_spots: {
        Row: {
          preference_id: string;
          value: Database['public']['Enums']['TattooSpot'];
        };
        Insert: {
          preference_id: string;
          value: Database['public']['Enums']['TattooSpot'];
        };
        Update: {
          preference_id?: string;
          value?: Database['public']['Enums']['TattooSpot'];
        };
        Relationships: [
          {
            foreignKeyName: 'event_preference_tattoo_spots_preference_id_fkey';
            columns: ['preference_id'];
            isOneToOne: false;
            referencedRelation: 'event_preferences';
            referencedColumns: ['id'];
          },
        ];
      };
      event_preferences: {
        Row: {
          additional_notes: string | null;
          age_group_id: string;
          created_at: string;
          height_max: number | null;
          height_min: number | null;
          id: string;
          pregnancy_allowed: boolean | null;
          pregnancy_months: number | null;
          weight_max: number | null;
          weight_min: number | null;
        };
        Insert: {
          additional_notes?: string | null;
          age_group_id: string;
          created_at?: string;
          height_max?: number | null;
          height_min?: number | null;
          id?: string;
          pregnancy_allowed?: boolean | null;
          pregnancy_months?: number | null;
          weight_max?: number | null;
          weight_min?: number | null;
        };
        Update: {
          additional_notes?: string | null;
          age_group_id?: string;
          created_at?: string;
          height_max?: number | null;
          height_min?: number | null;
          id?: string;
          pregnancy_allowed?: boolean | null;
          pregnancy_months?: number | null;
          weight_max?: number | null;
          weight_min?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'event_preferences_age_group_id_fkey';
            columns: ['age_group_id'];
            isOneToOne: false;
            referencedRelation: 'event_age_groups';
            referencedColumns: ['id'];
          },
        ];
      };
      event_qr_codes: {
        Row: {
          created_at: string;
          end_at: string;
          event_id: string;
          id: string;
          name: string;
          qr_path: string;
          start_at: string;
          token: string;
        };
        Insert: {
          created_at?: string;
          end_at: string;
          event_id: string;
          id?: string;
          name: string;
          qr_path: string;
          start_at: string;
          token: string;
        };
        Update: {
          created_at?: string;
          end_at?: string;
          event_id?: string;
          id?: string;
          name?: string;
          qr_path?: string;
          start_at?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_qr_codes_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      events: {
        Row: {
          brief: string | null;
          campaign_end_at: string | null;
          campaign_start_at: string | null;
          category_id: string | null;
          created_at: string;
          creator_id: string;
          deleted_at: string | null;
          description: string | null;
          end_at: string | null;
          event_type: string | null;
          id: string;
          nda_file_name: string | null;
          nda_file_path: string | null;
          nda_required: boolean | null;
          office_id: string;
          payment_amount: number | null;
          payment_mode: Database['public']['Enums']['EventPaymentMode'] | null;
          registration_closes_at: string | null;
          start_at: string | null;
          status: Database['public']['Enums']['EventStatus'];
          title: string;
          visibility: Database['public']['Enums']['EventVisibility'] | null;
        };
        Insert: {
          brief?: string | null;
          campaign_end_at?: string | null;
          campaign_start_at?: string | null;
          category_id?: string | null;
          created_at?: string;
          creator_id: string;
          deleted_at?: string | null;
          description?: string | null;
          end_at?: string | null;
          event_type?: string | null;
          id?: string;
          nda_file_name?: string | null;
          nda_file_path?: string | null;
          nda_required?: boolean | null;
          office_id: string;
          payment_amount?: number | null;
          payment_mode?: Database['public']['Enums']['EventPaymentMode'] | null;
          registration_closes_at?: string | null;
          start_at?: string | null;
          status?: Database['public']['Enums']['EventStatus'];
          title: string;
          visibility?: Database['public']['Enums']['EventVisibility'] | null;
        };
        Update: {
          brief?: string | null;
          campaign_end_at?: string | null;
          campaign_start_at?: string | null;
          category_id?: string | null;
          created_at?: string;
          creator_id?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_at?: string | null;
          event_type?: string | null;
          id?: string;
          nda_file_name?: string | null;
          nda_file_path?: string | null;
          nda_required?: boolean | null;
          office_id?: string;
          payment_amount?: number | null;
          payment_mode?: Database['public']['Enums']['EventPaymentMode'] | null;
          registration_closes_at?: string | null;
          start_at?: string | null;
          status?: Database['public']['Enums']['EventStatus'];
          title?: string;
          visibility?: Database['public']['Enums']['EventVisibility'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'events_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'events_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'org_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_office_id_fkey';
            columns: ['office_id'];
            isOneToOne: false;
            referencedRelation: 'offices';
            referencedColumns: ['id'];
          },
        ];
      };
      events_categories: {
        Row: {
          created_at: string;
          id: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
      events_subcategories: {
        Row: {
          category_id: string;
          id: string;
          title: string;
        };
        Insert: {
          category_id: string;
          id?: string;
          title: string;
        };
        Update: {
          category_id?: string;
          id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_subcategories_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'events_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      events_tags: {
        Row: {
          category_id: string;
          id: string;
          is_active: boolean | null;
          subcategory_id: string | null;
          title: string;
        };
        Insert: {
          category_id: string;
          id?: string;
          is_active?: boolean | null;
          subcategory_id?: string | null;
          title: string;
        };
        Update: {
          category_id?: string;
          id?: string;
          is_active?: boolean | null;
          subcategory_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_tags_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'events_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_tags_subcategory_id_fkey';
            columns: ['subcategory_id'];
            isOneToOne: false;
            referencedRelation: 'events_subcategories';
            referencedColumns: ['id'];
          },
        ];
      };
      flags: {
        Row: {
          created_at: string;
          created_by_org_id: string | null;
          created_by_user_id: string | null;
          description: string | null;
          duration_days: number | null;
          escalated_from_flag_id: string | null;
          event_id: string | null;
          expires_on: string | null;
          flag_type: string;
          id: string;
          reason: string;
          target_id: string;
          target_type: string;
        };
        Insert: {
          created_at?: string;
          created_by_org_id?: string | null;
          created_by_user_id?: string | null;
          description?: string | null;
          duration_days?: number | null;
          escalated_from_flag_id?: string | null;
          event_id?: string | null;
          expires_on?: string | null;
          flag_type: string;
          id?: string;
          reason: string;
          target_id: string;
          target_type: string;
        };
        Update: {
          created_at?: string;
          created_by_org_id?: string | null;
          created_by_user_id?: string | null;
          description?: string | null;
          duration_days?: number | null;
          escalated_from_flag_id?: string | null;
          event_id?: string | null;
          expires_on?: string | null;
          flag_type?: string;
          id?: string;
          reason?: string;
          target_id?: string;
          target_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'flags_created_by_org_id_fkey';
            columns: ['created_by_org_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'flags_escalated_from_flag_id_fkey';
            columns: ['escalated_from_flag_id'];
            isOneToOne: false;
            referencedRelation: 'flags';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'flags_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      hidden_events: {
        Row: {
          created_at: string;
          event_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          event_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'hidden_events_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      notification_settings: {
        Row: {
          settings: Json;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          settings?: Json;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          settings?: Json;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          title: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      office_control: {
        Row: {
          controlled_office_id: string;
          controller_office_id: string;
        };
        Insert: {
          controlled_office_id: string;
          controller_office_id: string;
        };
        Update: {
          controlled_office_id?: string;
          controller_office_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'office_control_controlled_office_id_fkey';
            columns: ['controlled_office_id'];
            isOneToOne: true;
            referencedRelation: 'offices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'office_control_controller_office_id_fkey';
            columns: ['controller_office_id'];
            isOneToOne: false;
            referencedRelation: 'offices';
            referencedColumns: ['id'];
          },
        ];
      };
      office_location: {
        Row: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          country_code: string;
          created_at: string;
          formatted_address: string;
          id: string;
          is_head_office: boolean | null;
          latitude: number;
          longitude: number;
          office_id: string | null;
          place_id: string;
          postal_code: string;
          region: string;
          street_name: string;
          street_number: string;
        };
        Insert: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          country_code: string;
          created_at?: string;
          formatted_address: string;
          id?: string;
          is_head_office?: boolean | null;
          latitude: number;
          longitude: number;
          office_id?: string | null;
          place_id: string;
          postal_code: string;
          region: string;
          street_name: string;
          street_number: string;
        };
        Update: {
          autocomplete_description?: string;
          city?: string;
          coords?: unknown;
          country?: string;
          country_code?: string;
          created_at?: string;
          formatted_address?: string;
          id?: string;
          is_head_office?: boolean | null;
          latitude?: number;
          longitude?: number;
          office_id?: string | null;
          place_id?: string;
          postal_code?: string;
          region?: string;
          street_name?: string;
          street_number?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'office_location_office_id_fkey';
            columns: ['office_id'];
            isOneToOne: false;
            referencedRelation: 'offices';
            referencedColumns: ['id'];
          },
        ];
      };
      office_member_capabilities: {
        Row: {
          capability_id: string;
          created_at: string;
          office_member_id: string;
        };
        Insert: {
          capability_id: string;
          created_at?: string;
          office_member_id: string;
        };
        Update: {
          capability_id?: string;
          created_at?: string;
          office_member_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'office_member_capabilities_capability_id_fkey';
            columns: ['capability_id'];
            isOneToOne: false;
            referencedRelation: 'capabilities';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'office_member_capabilities_office_member_id_fkey';
            columns: ['office_member_id'];
            isOneToOne: false;
            referencedRelation: 'office_members';
            referencedColumns: ['id'];
          },
        ];
      };
      office_members: {
        Row: {
          created_at: string;
          id: string;
          is_super_admin: boolean | null;
          office_id: string;
          organization_network_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_super_admin?: boolean | null;
          office_id: string;
          organization_network_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_super_admin?: boolean | null;
          office_id?: string;
          organization_network_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'office_members_office_id_fkey';
            columns: ['office_id'];
            isOneToOne: false;
            referencedRelation: 'offices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'office_members_organization_network_id_fkey';
            columns: ['organization_network_id'];
            isOneToOne: false;
            referencedRelation: 'organizations_network';
            referencedColumns: ['id'];
          },
        ];
      };
      offices: {
        Row: {
          brand_id: string;
          country_code: string;
          created_at: string;
          id: string;
          office_role: Database['public']['Enums']['OfficeRole'];
          organization_network_id: string;
        };
        Insert: {
          brand_id: string;
          country_code: string;
          created_at?: string;
          id?: string;
          office_role: Database['public']['Enums']['OfficeRole'];
          organization_network_id: string;
        };
        Update: {
          brand_id?: string;
          country_code?: string;
          created_at?: string;
          id?: string;
          office_role?: Database['public']['Enums']['OfficeRole'];
          organization_network_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'offices_brand_id_fkey';
            columns: ['brand_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'offices_organization_network_id_fkey';
            columns: ['organization_network_id'];
            isOneToOne: false;
            referencedRelation: 'organizations_network';
            referencedColumns: ['id'];
          },
        ];
      };
      org_users: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          email: string;
          first_name: string;
          gender: Database['public']['Enums']['Gender'];
          id: string;
          last_name: string;
          onboarding_copleted_step: number;
          personal_email: string;
          position: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          email: string;
          first_name: string;
          gender: Database['public']['Enums']['Gender'];
          id?: string;
          last_name: string;
          onboarding_copleted_step: number;
          personal_email?: string;
          position: string;
          username: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          email?: string;
          first_name?: string;
          gender?: Database['public']['Enums']['Gender'];
          id?: string;
          last_name?: string;
          onboarding_copleted_step?: number;
          personal_email?: string;
          position?: string;
          username?: string;
        };
        Relationships: [];
      };
      organizations_network: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      push_devices: {
        Row: {
          device_id: string;
          fcm_token: string;
          id: string;
          platform: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          device_id: string;
          fcm_token: string;
          id?: string;
          platform: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          device_id?: string;
          fcm_token?: string;
          id?: string;
          platform?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      talent_event_folder_items: {
        Row: {
          added_at: string;
          event_id: string;
          folder_id: string;
          id: string;
        };
        Insert: {
          added_at?: string;
          event_id: string;
          folder_id: string;
          id?: string;
        };
        Update: {
          added_at?: string;
          event_id?: string;
          folder_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'talent_event_folder_items_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'talent_event_folder_items_folder_id_fkey';
            columns: ['folder_id'];
            isOneToOne: false;
            referencedRelation: 'talent_event_folders';
            referencedColumns: ['id'];
          },
        ];
      };
      talent_event_folders: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          talent_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          talent_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          talent_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'talent_event_folders_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: false;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      talent_location: {
        Row: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          country_code: string | null;
          created_at: string;
          formatted_address: string;
          id: string;
          latitude: number;
          longitude: number;
          place_id: string;
          postal_code: string | null;
          region: string;
          talent_id: string;
        };
        Insert: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          country_code?: string | null;
          created_at?: string;
          formatted_address: string;
          id?: string;
          latitude: number;
          longitude: number;
          place_id: string;
          postal_code?: string | null;
          region: string;
          talent_id: string;
        };
        Update: {
          autocomplete_description?: string;
          city?: string;
          coords?: unknown;
          country?: string;
          country_code?: string | null;
          created_at?: string;
          formatted_address?: string;
          id?: string;
          latitude?: number;
          longitude?: number;
          place_id?: string;
          postal_code?: string | null;
          region?: string;
          talent_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'talent_location_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: true;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      talents: {
        Row: {
          accent: Database['public']['Enums']['Accent'] | null;
          additional_skills: string | null;
          avatar_full_path: string | null;
          avatar_path: string | null;
          birth_date: string;
          body_attributes:
            | Database['public']['Enums']['BodyAttributes'][]
            | null;
          build: number | null;
          categories: string[] | null;
          created_at: string;
          deleted_at: string | null;
          ethnicity: Database['public']['Enums']['Ethnicity'] | null;
          eye_color: Database['public']['Enums']['EyeColour'] | null;
          facial_attributes:
            | Database['public']['Enums']['FacialAttributes'][]
            | null;
          first_name: string;
          gender: Database['public']['Enums']['Gender'];
          hair_color: Database['public']['Enums']['HairColour'] | null;
          height: number | null;
          id: string;
          is_pregnant: boolean | null;
          last_name: string;
          onboarding_copleted_step: number;
          pregnancy_months: number | null;
          skin_tone: Database['public']['Enums']['SkinTone'] | null;
          subcategories: string[] | null;
          tags: string[] | null;
          tattoo_spot: Database['public']['Enums']['TattooSpot'][] | null;
          username: string;
        };
        Insert: {
          accent?: Database['public']['Enums']['Accent'] | null;
          additional_skills?: string | null;
          avatar_full_path?: string | null;
          avatar_path?: string | null;
          birth_date: string;
          body_attributes?:
            | Database['public']['Enums']['BodyAttributes'][]
            | null;
          build?: number | null;
          categories?: string[] | null;
          created_at?: string;
          deleted_at?: string | null;
          ethnicity?: Database['public']['Enums']['Ethnicity'] | null;
          eye_color?: Database['public']['Enums']['EyeColour'] | null;
          facial_attributes?:
            | Database['public']['Enums']['FacialAttributes'][]
            | null;
          first_name: string;
          gender: Database['public']['Enums']['Gender'];
          hair_color?: Database['public']['Enums']['HairColour'] | null;
          height?: number | null;
          id?: string;
          is_pregnant?: boolean | null;
          last_name: string;
          onboarding_copleted_step?: number;
          pregnancy_months?: number | null;
          skin_tone?: Database['public']['Enums']['SkinTone'] | null;
          subcategories?: string[] | null;
          tags?: string[] | null;
          tattoo_spot?: Database['public']['Enums']['TattooSpot'][] | null;
          username: string;
        };
        Update: {
          accent?: Database['public']['Enums']['Accent'] | null;
          additional_skills?: string | null;
          avatar_full_path?: string | null;
          avatar_path?: string | null;
          birth_date?: string;
          body_attributes?:
            | Database['public']['Enums']['BodyAttributes'][]
            | null;
          build?: number | null;
          categories?: string[] | null;
          created_at?: string;
          deleted_at?: string | null;
          ethnicity?: Database['public']['Enums']['Ethnicity'] | null;
          eye_color?: Database['public']['Enums']['EyeColour'] | null;
          facial_attributes?:
            | Database['public']['Enums']['FacialAttributes'][]
            | null;
          first_name?: string;
          gender?: Database['public']['Enums']['Gender'];
          hair_color?: Database['public']['Enums']['HairColour'] | null;
          height?: number | null;
          id?: string;
          is_pregnant?: boolean | null;
          last_name?: string;
          onboarding_copleted_step?: number;
          pregnancy_months?: number | null;
          skin_tone?: Database['public']['Enums']['SkinTone'] | null;
          subcategories?: string[] | null;
          tags?: string[] | null;
          tattoo_spot?: Database['public']['Enums']['TattooSpot'][] | null;
          username?: string;
        };
        Relationships: [];
      };
      team_invitations: {
        Row: {
          accepted_at: string | null;
          created_at: string;
          email: string;
          expires_at: string;
          first_name: string;
          id: string;
          invited_by: string;
          last_name: string;
          organization_network_id: string;
          position: string;
          role_access: Json;
          status: string;
          token: string;
        };
        Insert: {
          accepted_at?: string | null;
          created_at?: string;
          email: string;
          expires_at?: string;
          first_name: string;
          id?: string;
          invited_by: string;
          last_name: string;
          organization_network_id: string;
          position: string;
          role_access?: Json;
          status?: string;
          token?: string;
        };
        Update: {
          accepted_at?: string | null;
          created_at?: string;
          email?: string;
          expires_at?: string;
          first_name?: string;
          id?: string;
          invited_by?: string;
          last_name?: string;
          organization_network_id?: string;
          position?: string;
          role_access?: Json;
          status?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'team_invitations_invited_by_fkey';
            columns: ['invited_by'];
            isOneToOne: false;
            referencedRelation: 'org_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'team_invitations_organization_network_id_fkey';
            columns: ['organization_network_id'];
            isOneToOne: false;
            referencedRelation: 'organizations_network';
            referencedColumns: ['id'];
          },
        ];
      };
      uins: {
        Row: {
          created_at: string;
          id: string;
          uin: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          uin: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          uin?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_availability: {
        Row: {
          availability: Database['public']['Enums']['availability_type'];
          created_at: string | null;
          end_date: string | null;
          is_traveling: boolean;
          location: string | null;
          start_date: string | null;
          trip_availability: Database['public']['Enums']['trip_availability_type'];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          availability: Database['public']['Enums']['availability_type'];
          created_at?: string | null;
          end_date?: string | null;
          is_traveling?: boolean;
          location?: string | null;
          start_date?: string | null;
          trip_availability: Database['public']['Enums']['trip_availability_type'];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          availability?: Database['public']['Enums']['availability_type'];
          created_at?: string | null;
          end_date?: string | null;
          is_traveling?: boolean;
          location?: string | null;
          start_date?: string | null;
          trip_availability?: Database['public']['Enums']['trip_availability_type'];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      user_kyc: {
        Row: {
          complycube_client_id: string | null;
          status: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          complycube_client_id?: string | null;
          status?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          complycube_client_id?: string | null;
          status?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      user_travel_availability: {
        Row: {
          created_at: string | null;
          custom_from: string | null;
          custom_to: string | null;
          date: string;
          id: string;
          time_slot: Database['public']['Enums']['time_slot'];
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          custom_from?: string | null;
          custom_to?: string | null;
          date: string;
          id?: string;
          time_slot: Database['public']['Enums']['time_slot'];
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          custom_from?: string | null;
          custom_to?: string | null;
          date?: string;
          id?: string;
          time_slot?: Database['public']['Enums']['time_slot'];
          user_id?: string;
        };
        Relationships: [];
      };
      user_weekly_availability: {
        Row: {
          created_at: string | null;
          custom_from: string | null;
          custom_to: string | null;
          day: Database['public']['Enums']['day_of_week'];
          id: string;
          time_slot: Database['public']['Enums']['time_slot'];
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          custom_from?: string | null;
          custom_to?: string | null;
          day: Database['public']['Enums']['day_of_week'];
          id?: string;
          time_slot: Database['public']['Enums']['time_slot'];
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          custom_from?: string | null;
          custom_to?: string | null;
          day?: Database['public']['Enums']['day_of_week'];
          id?: string;
          time_slot?: Database['public']['Enums']['time_slot'];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      user_availability_full: {
        Row: {
          availability: Database['public']['Enums']['availability_type'] | null;
          created_at: string | null;
          dayschedules: Json | null;
          end_date: string | null;
          is_traveling: boolean | null;
          location: string | null;
          start_date: string | null;
          traveldays: Json | null;
          trip_availability:
            | Database['public']['Enums']['trip_availability_type']
            | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          availability?:
            | Database['public']['Enums']['availability_type']
            | null;
          created_at?: string | null;
          dayschedules?: never;
          end_date?: string | null;
          is_traveling?: boolean | null;
          location?: string | null;
          start_date?: string | null;
          traveldays?: never;
          trip_availability?:
            | Database['public']['Enums']['trip_availability_type']
            | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          availability?:
            | Database['public']['Enums']['availability_type']
            | null;
          created_at?: string | null;
          dayschedules?: never;
          end_date?: string | null;
          is_traveling?: boolean | null;
          location?: string | null;
          start_date?: string | null;
          traveldays?: never;
          trip_availability?:
            | Database['public']['Enums']['trip_availability_type']
            | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      add_event_to_talent_events_folder: {
        Args: { p_event_id: string; p_folder_id: string };
        Returns: undefined;
      };
      add_talent_to_custom_list: {
        Args: { p_list_id: string; p_talent_id: string };
        Returns: undefined;
      };
      available_users_at: {
        Args: { p_at: string; p_user_ids: string[] };
        Returns: {
          user_id: string;
        }[];
      };
      check_user_exists_by_username: {
        Args: { username_param: string };
        Returns: boolean;
      };
      core_accessible_events: {
        Args: { p_context: string; p_user_id: string };
        Returns: {
          brief: string | null;
          campaign_end_at: string | null;
          campaign_start_at: string | null;
          category_id: string | null;
          created_at: string;
          creator_id: string;
          deleted_at: string | null;
          description: string | null;
          end_at: string | null;
          event_type: string | null;
          id: string;
          nda_file_name: string | null;
          nda_file_path: string | null;
          nda_required: boolean | null;
          office_id: string;
          payment_amount: number | null;
          payment_mode: Database['public']['Enums']['EventPaymentMode'] | null;
          registration_closes_at: string | null;
          start_at: string | null;
          status: Database['public']['Enums']['EventStatus'];
          title: string;
          visibility: Database['public']['Enums']['EventVisibility'] | null;
        }[];
        SetofOptions: {
          from: '*';
          to: 'events';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      create_custom_list: {
        Args: { p_name: string };
        Returns: {
          created_at: string;
          id: string;
          name: string;
          owner_id: string;
        };
        SetofOptions: {
          from: '*';
          to: 'custom_lists';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      create_event_group_chat: {
        Args: { p_brand_id: string; p_event_id: string };
        Returns: string;
      };
      create_new_draft_or_event: { Args: { payload: Json }; Returns: string };
      create_talent_events_folder: {
        Args: { p_name: string };
        Returns: string;
      };
      delete_custom_list: {
        Args: { p_event_id: string; p_list_id: string };
        Returns: undefined;
      };
      delete_draft_event: { Args: { event_id_param: string }; Returns: string };
      delete_event_qr_code: { Args: { p_qr_id: string }; Returns: undefined };
      delete_talent_events_folder: {
        Args: { p_folder_id: string };
        Returns: undefined;
      };
      dto_event_details_for_talent: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      dto_event_details_org_member: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      dto_event_list_org_member: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      dto_events_list_for_talent: {
        Args: { p_event: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      earth: { Args: never; Returns: number };
      get_active_flag_for_target: {
        Args: { target_id_input: string; target_type_input: string };
        Returns: {
          description: string;
          duration_days: number;
          expires_on: string;
          flag_type: string;
          reason: string;
          status: string;
        }[];
      };
      get_all_talents: {
        Args: {
          p_event_id?: string;
          p_filters?: Json;
          p_limit: number;
          p_offset: number;
          p_search?: string;
        };
        Returns: {
          avatar_path: string;
          city: string;
          country: string;
          first_name: string;
          flag: string;
          id: string;
          last_name: string;
          participation_status: Database['public']['Enums']['participation_status'];
          total: number;
        }[];
      };
      get_brand_events: {
        Args: {
          end_after?: string;
          end_before?: string;
          limit_param?: number;
          offset_param?: number;
          p_brand_id: string;
          search_query?: string;
          start_after?: string;
          start_before?: string;
          status_filter?: string;
          visibility_filter?: string;
        };
        Returns: Json;
      };
      get_brand_events_counts: { Args: { p_brand_id: string }; Returns: Json };
      get_cancellation_info: { Args: { p_event_id: string }; Returns: Json };
      get_chat_messages: {
        Args: { p_chat_id: string; p_cursor?: string; p_limit?: number };
        Returns: {
          created_at: string;
          id: string;
          sender_id: string;
          text: string;
        }[];
      };
      get_chat_participants: {
        Args: { p_chat_id: string };
        Returns: {
          avatar_url: string;
          display_name: string;
          role: string;
          user_id: string;
        }[];
      };
      get_custom_list_talents: {
        Args: {
          p_event_id: string;
          p_limit: number;
          p_list_id: string;
          p_offset: number;
        };
        Returns: {
          avatar_path: string;
          city: string;
          country: string;
          first_name: string;
          flag: string;
          id: string;
          last_name: string;
          participation_status: string;
          total: number;
        }[];
      };
      get_custom_lists: {
        Args: never;
        Returns: {
          created_at: string;
          id: string;
          members_count: number;
          name: string;
          owner_id: string;
        }[];
      };
      get_event_details_for_brand_member: {
        Args: { p_event_id: string };
        Returns: Json;
      };
      get_event_details_for_talent: {
        Args: { p_event_id: string };
        Returns: Json;
      };
      get_event_participants_by_status: {
        Args: {
          p_event_id: string;
          p_initiated_by?: Database['public']['Enums']['participation_initiator'];
          p_limit?: number;
          p_offset?: number;
          p_status: Database['public']['Enums']['participation_status'];
        };
        Returns: {
          avatar_url: string;
          flag: string;
          location: string;
          name: string;
          participationId: string;
          talentId: string;
        }[];
      };
      get_event_participants_counts: {
        Args: { p_event_id: string };
        Returns: {
          applied: number;
          approved: number;
          invited: number;
          rejected: number;
        }[];
      };
      get_event_qr_code: { Args: { p_qr_id: string }; Returns: Json };
      get_event_qr_codes: {
        Args: { p_event_id: string; p_limit?: number; p_offset?: number };
        Returns: Json;
      };
      get_invitable_talents: {
        Args: {
          p_event_id: string;
          p_filters?: Json;
          p_limit: number;
          p_offset: number;
          p_search: string;
        };
        Returns: {
          avatar_path: string;
          city: string;
          country: string;
          first_name: string;
          flag: string;
          id: string;
          last_name: string;
          total: number;
        }[];
      };
      get_matching_talents: {
        Args: {
          filter_distance_km?: number;
          limit_param?: number;
          offset_param?: number;
          p_event_id: string;
          search_query?: string;
        };
        Returns: Json;
      };
      get_my_org_user: { Args: never; Returns: Json };
      get_org_flags: {
        Args: { p_office_id: string };
        Returns: {
          brand_id: string;
          created_at: string;
          created_by_name: string;
          description: string;
          event_name: string;
          flag_type: string;
          id: string;
          reason: string;
        }[];
      };
      get_organization_events: {
        Args: {
          end_after?: string;
          end_before?: string;
          limit_param?: number;
          offset_param?: number;
          search_query?: string;
          start_after?: string;
          start_before?: string;
          status_filter?: string;
          visibility_filter?: string;
        };
        Returns: Json;
      };
      get_public_events_for_talent: {
        Args: {
          filter_date_from?: string;
          filter_date_to?: string;
          filter_distance_km?: number;
          filter_payment_type?: string;
          limit_param?: number;
          offset_param?: number;
          search_query?: string;
          sort_mode?: string;
          user_lat?: number;
          user_lng?: number;
        };
        Returns: Json;
      };
      get_public_events_search_with_preferences: {
        Args: {
          filter_date_from?: string;
          filter_date_to?: string;
          filter_distance_km?: number;
          filter_payment_type?: string;
          limit_param?: number;
          offset_param?: number;
          search_query?: string;
          sort_mode?: string;
          user_lat?: number;
          user_lng?: number;
        };
        Returns: Json;
      };
      get_talent_event_counters: {
        Args: never;
        Returns: {
          approved: number;
          declined: number;
          denied: number;
          pending: number;
          proposals: number;
        }[];
      };
      get_talent_event_history: {
        Args: { p_limit?: number; p_offset?: number };
        Returns: Json;
      };
      get_talent_events_by_status: {
        Args: {
          p_initiated_by?: Database['public']['Enums']['participation_initiator'];
          p_limit?: number;
          p_offset?: number;
          p_status: Database['public']['Enums']['participation_status'];
        };
        Returns: {
          brief: string;
          can_reaccept: boolean;
          category_id: string;
          created_at: string;
          end_at: string;
          event_id: string;
          event_title: string;
          formatted_address: string;
          latitude: number;
          longitude: number;
          max_participations: number;
          participation_id: string;
          payment_amount: number;
          payment_mode: string;
          start_at: string;
        }[];
      };
      get_talent_events_counts: {
        Args: never;
        Returns: {
          approved: number;
          denied: number;
          pending: number;
          proposals: number;
        }[];
      };
      get_talent_flags: {
        Args: { p_talent_id: string };
        Returns: {
          brand_name: string;
          created_at: string;
          description: string;
          flag_type: string;
          id: string;
          reason: string;
        }[];
      };
      get_talent_participation_events: {
        Args: {
          p_initiated_by?: Database['public']['Enums']['participation_initiator'];
          p_limit?: number;
          p_offset?: number;
          p_status: Database['public']['Enums']['participation_status'];
        };
        Returns: Json;
      };
      get_talent_profile: { Args: { p_talent_id: string }; Returns: Json };
      get_talents_for_custom_list: {
        Args: {
          p_limit: number;
          p_list_id: string;
          p_offset: number;
          p_search: string;
        };
        Returns: {
          avatar_path: string;
          city: string;
          country: string;
          first_name: string;
          flag: string;
          id: string;
          is_in_list: boolean;
          last_name: string;
          total: number;
        }[];
      };
      get_user_network_ids: { Args: never; Returns: string[] };
      guard_office_any_capability: {
        Args: { p_capability_codes: string[]; p_office_id: string };
        Returns: undefined;
      };
      guard_office_any_capability_bool: {
        Args: { p_capability_codes: string[]; p_office_id: string };
        Returns: boolean;
      };
      guard_office_capability: {
        Args: { p_capability_code: string; p_office_id: string };
        Returns: undefined;
      };
      hide_event: { Args: { p_event_id: string }; Returns: undefined };
      is_chat_participant: { Args: { p_chat_id: string }; Returns: boolean };
      is_user_available: {
        Args: { p_at: string; p_user_id: string };
        Returns: boolean;
      };
      join_event_group_chat: { Args: { p_event_id: string }; Returns: string };
      list_events_in_talent_events_folder: {
        Args: {
          limit_param?: number;
          offset_param?: number;
          p_folder_id: string;
        };
        Returns: Json;
      };
      list_talent_events_folders: {
        Args: { p_event_id?: string };
        Returns: Json;
      };
      publish_event_draft: {
        Args: { event_id_param: string };
        Returns: string;
      };
      remove_event_from_talent_events_folder: {
        Args: { p_event_id: string; p_folder_id: string };
        Returns: undefined;
      };
      remove_push_device: { Args: { p_device_id: string }; Returns: undefined };
      remove_talent_from_custom_list: {
        Args: { p_event_id: string; p_list_id: string; p_talent_id: string };
        Returns: undefined;
      };
      rename_talent_events_folder: {
        Args: { p_folder_id: string; p_name: string };
        Returns: undefined;
      };
      scan_qr_code_by_talent: { Args: { p_token: string }; Returns: Json };
      timeslot_range: {
        Args: {
          p_custom_from: string;
          p_custom_to: string;
          p_slot: Database['public']['Enums']['time_slot'];
        };
        Returns: unknown;
      };
      toggle_event_in_talent_events_folder: {
        Args: { p_event_id: string; p_folder_id: string };
        Returns: boolean;
      };
      update_brand: {
        Args: {
          p_brand_id: string;
          p_brand_name?: string;
          p_logo_path?: string;
        };
        Returns: Json;
      };
      update_custom_list_name: {
        Args: { p_event_id: string; p_list_id: string; p_name: string };
        Returns: undefined;
      };
      update_event_draft: {
        Args: { event_id_param: string; payload: Json };
        Returns: string;
      };
      update_event_qr_code: {
        Args: {
          p_end_at?: string;
          p_name?: string;
          p_qr_id: string;
          p_start_at?: string;
        };
        Returns: undefined;
      };
      update_talent_availability: {
        Args: {
          p_availability: Database['public']['Enums']['availability_type'];
          p_day_schedules: Json;
          p_end_date: string;
          p_is_traveling: boolean;
          p_location: string;
          p_start_date: string;
          p_talent_id: string;
          p_travel_days: Json;
          p_trip_availability: Database['public']['Enums']['trip_availability_type'];
        };
        Returns: undefined;
      };
      update_user_availability: {
        Args: {
          p_availability: Database['public']['Enums']['availability_type'];
          p_day_schedules: Json;
          p_end_date: string;
          p_is_traveling: boolean;
          p_location: string;
          p_start_date: string;
          p_travel_days: Json;
          p_trip_availability: Database['public']['Enums']['trip_availability_type'];
        };
        Returns: undefined;
      };
      upsert_push_device: {
        Args: { p_device_id: string; p_fcm_token: string; p_platform: string };
        Returns: undefined;
      };
      upsert_talent_full_body_photo: {
        Args: { file_path: string };
        Returns: {
          created_at: string;
          id: string;
          mime_type: string;
          name: string;
          size: number;
          talent_id: string;
          url: string;
        }[];
      };
      validate_event_for_publish: {
        Args: { payload: Json };
        Returns: undefined;
      };
    };
    Enums: {
      Accent:
        | 'native'
        | 'american'
        | 'foreign'
        | 'australian'
        | 'european'
        | 'british'
        | 'indian'
        | 'other_doesnt_matter';
      availability_type: 'always' | 'schedule';
      BodyAttributes:
        | 'tattoos'
        | 'birthmarks'
        | 'amputations'
        | 'scars'
        | 'burns';
      category_type:
        | 'hospitality'
        | 'retail'
        | 'pr_groups'
        | 'private_events'
        | 'music_groups'
        | 'politics'
        | 'tv_ad_hoc'
        | 'film_extra';
      chat_type: 'group' | 'direct';
      day_of_week: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
      Ethnicity:
        | 'asian'
        | 'caucasian'
        | 'african'
        | 'islander'
        | 'middle_eastern'
        | 'indian_south_asian'
        | 'latino_hispanic'
        | 'mixed'
        | 'other_not_sure';
      EventPaymentMode: 'per_hour' | 'fixed';
      EventStatus: 'draft' | 'published' | 'cancelled';
      EventVisibility: 'private' | 'public';
      EyeColour:
        | 'blue'
        | 'brown'
        | 'green'
        | 'hazel'
        | 'black'
        | 'grey'
        | 'amber'
        | 'other_not_sure';
      FacialAttributes:
        | 'birthmark'
        | 'moles'
        | 'scars'
        | 'freckles'
        | 'tattoos'
        | 'burns';
      Gender: 'male' | 'female' | 'other';
      HairColour:
        | 'blue'
        | 'brown'
        | 'green'
        | 'dyed_colored'
        | 'hazel'
        | 'black'
        | 'grey_white'
        | 'amber'
        | 'bald_shaved'
        | 'other_not_sure';
      OfficeRole: 'HQ' | 'MAIN_OPERATIONAL' | 'BRANCH';
      OrganizationMemberRole: 'owner' | 'admin';
      OrgMemberPermissions:
        | 'master'
        | 'branch_master_admin'
        | 'recruit_applicants'
        | 'approve_applicants'
        | 'give_feedback'
        | 'rate_applicants'
        | 'create_events'
        | 'view_events'
        | 'message_applicants'
        | 'group_message'
        | 'one_on_one_message'
        | 'manage_checkins'
        | 'invite_team_members'
        | 'edit_team_members'
        | 'edit_business_info'
        | 'view_earnings'
        | 'authorize_talent_one_on_one_payments'
        | 'authorize_talent_payments'
        | 'edit_bank_info';
      participation_initiator: 'organization' | 'talent';
      participation_status: 'pending' | 'approved' | 'rejected';
      SkinTone:
        | 'porcelain'
        | 'ivory'
        | 'warm_ivory'
        | 'sand'
        | 'beige'
        | 'warm_beige'
        | 'natural'
        | 'honey'
        | 'golden'
        | 'almond'
        | 'chestnut'
        | 'espresso';
      TattooSpot:
        | 'on_sleeves'
        | 'on_body'
        | 'on_neck'
        | 'on_hand'
        | 'on_arm'
        | 'on_back'
        | 'on_thigh'
        | 'on_calf'
        | 'on_ankle';
      time_slot:
        | 'all_day'
        | 'morning'
        | 'afternoon'
        | 'evening'
        | 'custom'
        | 'not_available';
      trip_availability_type: 'regular' | 'custom' | 'not_available';
      СapabilityСategory:
        | 'talent'
        | 'events'
        | 'checkins'
        | 'settings'
        | 'financial'
        | 'master';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      Accent: [
        'native',
        'american',
        'foreign',
        'australian',
        'european',
        'british',
        'indian',
        'other_doesnt_matter',
      ],
      availability_type: ['always', 'schedule'],
      BodyAttributes: [
        'tattoos',
        'birthmarks',
        'amputations',
        'scars',
        'burns',
      ],
      category_type: [
        'hospitality',
        'retail',
        'pr_groups',
        'private_events',
        'music_groups',
        'politics',
        'tv_ad_hoc',
        'film_extra',
      ],
      chat_type: ['group', 'direct'],
      day_of_week: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      Ethnicity: [
        'asian',
        'caucasian',
        'african',
        'islander',
        'middle_eastern',
        'indian_south_asian',
        'latino_hispanic',
        'mixed',
        'other_not_sure',
      ],
      EventPaymentMode: ['per_hour', 'fixed'],
      EventStatus: ['draft', 'published', 'cancelled'],
      EventVisibility: ['private', 'public'],
      EyeColour: [
        'blue',
        'brown',
        'green',
        'hazel',
        'black',
        'grey',
        'amber',
        'other_not_sure',
      ],
      FacialAttributes: [
        'birthmark',
        'moles',
        'scars',
        'freckles',
        'tattoos',
        'burns',
      ],
      Gender: ['male', 'female', 'other'],
      HairColour: [
        'blue',
        'brown',
        'green',
        'dyed_colored',
        'hazel',
        'black',
        'grey_white',
        'amber',
        'bald_shaved',
        'other_not_sure',
      ],
      OfficeRole: ['HQ', 'MAIN_OPERATIONAL', 'BRANCH'],
      OrganizationMemberRole: ['owner', 'admin'],
      OrgMemberPermissions: [
        'master',
        'branch_master_admin',
        'recruit_applicants',
        'approve_applicants',
        'give_feedback',
        'rate_applicants',
        'create_events',
        'view_events',
        'message_applicants',
        'group_message',
        'one_on_one_message',
        'manage_checkins',
        'invite_team_members',
        'edit_team_members',
        'edit_business_info',
        'view_earnings',
        'authorize_talent_one_on_one_payments',
        'authorize_talent_payments',
        'edit_bank_info',
      ],
      participation_initiator: ['organization', 'talent'],
      participation_status: ['pending', 'approved', 'rejected'],
      SkinTone: [
        'porcelain',
        'ivory',
        'warm_ivory',
        'sand',
        'beige',
        'warm_beige',
        'natural',
        'honey',
        'golden',
        'almond',
        'chestnut',
        'espresso',
      ],
      TattooSpot: [
        'on_sleeves',
        'on_body',
        'on_neck',
        'on_hand',
        'on_arm',
        'on_back',
        'on_thigh',
        'on_calf',
        'on_ankle',
      ],
      time_slot: [
        'all_day',
        'morning',
        'afternoon',
        'evening',
        'custom',
        'not_available',
      ],
      trip_availability_type: ['regular', 'custom', 'not_available'],
      СapabilityСategory: [
        'talent',
        'events',
        'checkins',
        'settings',
        'financial',
        'master',
      ],
    },
  },
} as const;
