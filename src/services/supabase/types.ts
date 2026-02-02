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
            referencedRelation: 'organizations';
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
            referencedRelation: 'organizations';
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
            referencedRelation: 'organizations_members';
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
          organization_member_id: string;
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
          organization_member_id: string;
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
          organization_member_id?: string;
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
      events: {
        Row: {
          brief: string | null;
          category_id: string | null;
          created_at: string;
          creator_id: string;
          deleted_at: string | null;
          end_at: string | null;
          id: string;
          nda_file_name: string | null;
          nda_file_path: string | null;
          nda_required: boolean | null;
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
          category_id?: string | null;
          created_at?: string;
          creator_id: string;
          deleted_at?: string | null;
          end_at?: string | null;
          id?: string;
          nda_file_name?: string | null;
          nda_file_path?: string | null;
          nda_required?: boolean | null;
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
          category_id?: string | null;
          created_at?: string;
          creator_id?: string;
          deleted_at?: string | null;
          end_at?: string | null;
          id?: string;
          nda_file_name?: string | null;
          nda_file_path?: string | null;
          nda_required?: boolean | null;
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
            referencedRelation: 'organizations_members';
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
      organization_branches: {
        Row: {
          country_code: string;
          country_name: string;
          created_at: string;
          id: string;
          is_headquarter: boolean;
          organization_id: string;
        };
        Insert: {
          country_code: string;
          country_name: string;
          created_at?: string;
          id?: string;
          is_headquarter: boolean;
          organization_id: string;
        };
        Update: {
          country_code?: string;
          country_name?: string;
          created_at?: string;
          id?: string;
          is_headquarter?: boolean;
          organization_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organization_branches_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      organization_permissions: {
        Row: {
          category: Database['public']['Enums']['OrgPermissionsCategories'];
          id: Database['public']['Enums']['OrgMemberPermissions'];
          label: string;
          sort_order: number;
        };
        Insert: {
          category: Database['public']['Enums']['OrgPermissionsCategories'];
          id: Database['public']['Enums']['OrgMemberPermissions'];
          label: string;
          sort_order: number;
        };
        Update: {
          category?: Database['public']['Enums']['OrgPermissionsCategories'];
          id?: Database['public']['Enums']['OrgMemberPermissions'];
          label?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          avatar_path: string | null;
          created_at: string;
          deleted_at: string | null;
          id: string;
          organization_name: string;
        };
        Insert: {
          avatar_path?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          organization_name: string;
        };
        Update: {
          avatar_path?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          organization_name?: string;
        };
        Relationships: [];
      };
      organizations_locations: {
        Row: {
          autocomplete_description: string;
          branch_id: string;
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
          place_id: string;
          postal_code: string;
          region: string;
          street_name: string;
          street_number: string;
        };
        Insert: {
          autocomplete_description: string;
          branch_id: string;
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
          place_id: string;
          postal_code: string;
          region: string;
          street_name: string;
          street_number: string;
        };
        Update: {
          autocomplete_description?: string;
          branch_id?: string;
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
          place_id?: string;
          postal_code?: string;
          region?: string;
          street_name?: string;
          street_number?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_locations_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'organization_branches';
            referencedColumns: ['id'];
          },
        ];
      };
      organizations_members: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          email: string;
          first_name: string;
          gender: Database['public']['Enums']['Gender'];
          id: string;
          last_name: string;
          onboarding_copleted_step: number;
          organization_id: string;
          position: string;
          role: Database['public']['Enums']['OrganizationMemberRole'];
          username: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          email: string;
          first_name: string;
          gender: Database['public']['Enums']['Gender'];
          id: string;
          last_name: string;
          onboarding_copleted_step?: number;
          organization_id: string;
          position: string;
          role: Database['public']['Enums']['OrganizationMemberRole'];
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
          organization_id?: string;
          position?: string;
          role?: Database['public']['Enums']['OrganizationMemberRole'];
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_members_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      organizations_members_access: {
        Row: {
          branch_id: string | null;
          created_at: string;
          id: string;
          member_id: string;
          permission_id: Database['public']['Enums']['OrgMemberPermissions'];
        };
        Insert: {
          branch_id?: string | null;
          created_at?: string;
          id?: string;
          member_id: string;
          permission_id: Database['public']['Enums']['OrgMemberPermissions'];
        };
        Update: {
          branch_id?: string | null;
          created_at?: string;
          id?: string;
          member_id?: string;
          permission_id?: Database['public']['Enums']['OrgMemberPermissions'];
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_members_access_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'organization_branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organizations_members_access_member_id_fkey';
            columns: ['member_id'];
            isOneToOne: false;
            referencedRelation: 'organizations_members';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organizations_members_access_permission_id_fkey';
            columns: ['permission_id'];
            isOneToOne: false;
            referencedRelation: 'organization_permissions';
            referencedColumns: ['id'];
          },
        ];
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
          created_at: string;
          formatted_address: string;
          id: string;
          latitude: number;
          longitude: number;
          place_id: string;
          postal_code: string;
          region: string;
          talent_id: string;
        };
        Insert: {
          autocomplete_description: string;
          city: string;
          coords: unknown;
          country: string;
          created_at?: string;
          formatted_address: string;
          id?: string;
          latitude: number;
          longitude: number;
          place_id: string;
          postal_code: string;
          region: string;
          talent_id: string;
        };
        Update: {
          autocomplete_description?: string;
          city?: string;
          coords?: unknown;
          country?: string;
          created_at?: string;
          formatted_address?: string;
          id?: string;
          latitude?: number;
          longitude?: number;
          place_id?: string;
          postal_code?: string;
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
          category_id: string | null;
          created_at: string;
          creator_id: string;
          deleted_at: string | null;
          end_at: string | null;
          id: string;
          nda_file_name: string | null;
          nda_file_path: string | null;
          nda_required: boolean | null;
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
      create_draft_or_event: { Args: { payload: Json }; Returns: string };
      create_event_with_preferences: {
        Args: { payload: Json };
        Returns: string;
      };
      create_talent_events_folder: {
        Args: { p_name: string };
        Returns: string;
      };
      delete_custom_list: {
        Args: { p_event_id: string; p_list_id: string };
        Returns: undefined;
      };
      delete_draft_event: { Args: { event_id_param: string }; Returns: string };
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
          id: string;
          last_name: string;
          status: Database['public']['Enums']['participation_status'];
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
      get_event_details_for_talent: {
        Args: { p_event_id: string };
        Returns: Json;
      };
      get_event_details_org_member: {
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
      get_events_stats_by_organization: {
        Args: { p_organization_id: string };
        Returns: Json;
      };
      get_invitable_talents: {
        Args: {
          p_event_id: string;
          p_filters?: Json;
          p_limit: number;
          p_offset?: number;
          p_search?: string;
        };
        Returns: {
          avatar_path: string;
          city: string;
          country: string;
          first_name: string;
          id: string;
          last_name: string;
          total: number;
        }[];
      };
      get_invitable_talents_for_custom_list: {
        Args: {
          p_event_id: string;
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
          id: string;
          is_in_list: boolean;
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
      get_me_org_member: { Args: never; Returns: Json };
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
      get_talent_participation_events: {
        Args: {
          p_initiated_by?: string;
          p_limit?: number;
          p_offset?: number;
          p_status: string;
        };
        Returns: Json;
      };
      has_org_member_permission: {
        Args: {
          p_branch_id: string;
          p_member_id: string;
          p_permission: string;
        };
        Returns: boolean;
      };
      hide_event: { Args: { p_event_id: string }; Returns: undefined };
      is_chat_participant: { Args: { p_chat_id: string }; Returns: boolean };
      is_user_available: {
        Args: { p_at: string; p_user_id: string };
        Returns: boolean;
      };
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
      remove_talent_from_custom_list: {
        Args: { p_event_id: string; p_list_id: string; p_talent_id: string };
        Returns: undefined;
      };
      rename_talent_events_folder: {
        Args: { p_folder_id: string; p_name: string };
        Returns: undefined;
      };
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
      update_custom_list_name: {
        Args: { p_event_id: string; p_list_id: string; p_name: string };
        Returns: undefined;
      };
      update_event_draft: {
        Args: { event_id_param: string; payload: Json };
        Returns: string;
      };
      update_organization: {
        Args: {
          p_avatar_path?: string;
          p_organization_id: string;
          p_organization_name?: string;
        };
        Returns: Json;
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
      EventStatus: 'draft' | 'published';
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
      OrgPermissionsCategories:
        | 'talent'
        | 'events'
        | 'checkins'
        | 'settings'
        | 'financial'
        | 'master';
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
      EventStatus: ['draft', 'published'],
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
      OrgPermissionsCategories: [
        'talent',
        'events',
        'checkins',
        'settings',
        'financial',
        'master',
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
    },
  },
} as const;
