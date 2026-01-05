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
      chat_identities: {
        Row: {
          created_at: string | null;
          id: string;
          organization_id: string | null;
          talent_id: string | null;
          type: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          organization_id?: string | null;
          talent_id?: string | null;
          type: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          organization_id?: string | null;
          talent_id?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_identities_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: true;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_identities_talent_id_fkey';
            columns: ['talent_id'];
            isOneToOne: true;
            referencedRelation: 'talents';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_participants: {
        Row: {
          chat_id: string;
          has_unread: boolean | null;
          identity_id: string | null;
          joined_at: string | null;
          user_id: string;
        };
        Insert: {
          chat_id: string;
          has_unread?: boolean | null;
          identity_id?: string | null;
          joined_at?: string | null;
          user_id: string;
        };
        Update: {
          chat_id?: string;
          has_unread?: boolean | null;
          identity_id?: string | null;
          joined_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_participants_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_participants_identity_id_fkey';
            columns: ['identity_id'];
            isOneToOne: false;
            referencedRelation: 'chat_identities';
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
          postal_code: string;
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
          postal_code: string;
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
          postal_code?: string;
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
      organizations: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          organization_name: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          organization_name: string;
        };
        Update: {
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
          city: string;
          coords: unknown;
          country: string;
          created_at: string;
          formatted_address: string;
          id: string;
          is_head_office: boolean;
          latitude: number;
          longitude: number;
          organization_id: string;
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
          created_at?: string;
          formatted_address: string;
          id?: string;
          is_head_office: boolean;
          latitude: number;
          longitude: number;
          organization_id: string;
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
          created_at?: string;
          formatted_address?: string;
          id?: string;
          is_head_office?: boolean;
          latitude?: number;
          longitude?: number;
          organization_id?: string;
          place_id?: string;
          postal_code?: string;
          region?: string;
          street_name?: string;
          street_number?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_locations_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
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
          additional_skills: string | null;
          avatar_full_path: string | null;
          avatar_path: string | null;
          birth_date: string;
          body_attributes: Database['public']['Enums']['BodyAttributes'] | null;
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
          additional_skills?: string | null;
          avatar_full_path?: string | null;
          avatar_path?: string | null;
          birth_date: string;
          body_attributes?:
            | Database['public']['Enums']['BodyAttributes']
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
          additional_skills?: string | null;
          avatar_full_path?: string | null;
          avatar_path?: string | null;
          birth_date?: string;
          body_attributes?:
            | Database['public']['Enums']['BodyAttributes']
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
      create_event_with_preferences: {
        Args: { payload: Json };
        Returns: string;
      };
      dto_event_details_org_member: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      dto_event_list_org_member: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      dto_event_list_talent_own: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      dto_event_list_talent_public: {
        Args: { e: Database['public']['Tables']['events']['Row'] };
        Returns: Json;
      };
      earth: { Args: never; Returns: number };
      get_event_details_org_member: {
        Args: { p_event_id: string };
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
      get_public_events_search: {
        Args: {
          limit_param?: number;
          offset_param?: number;
          search_query?: string;
          sort_mode?: string;
          user_lat?: number;
          user_lng?: number;
        };
        Returns: Json;
      };
      get_talent_own_events: {
        Args: {
          limit_param?: number;
          offset_param?: number;
          search_query?: string;
          visibility_filter?: string;
        };
        Returns: Json;
      };
      is_user_available: {
        Args: { p_at: string; p_user_id: string };
        Returns: boolean;
      };
      timeslot_range: {
        Args: {
          p_custom_from: string;
          p_custom_to: string;
          p_slot: Database['public']['Enums']['time_slot'];
        };
        Returns: unknown;
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
      TattooSpot: 'on_sleeves' | 'on_body' | 'on_neck' | 'on_hand';
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
      TattooSpot: ['on_sleeves', 'on_body', 'on_neck', 'on_hand'],
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
