export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      email_verifications: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          otp_code: string
          verification_token: string | null
          verified: boolean
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          id?: string
          otp_code: string
          verification_token?: string | null
          verified: boolean
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          otp_code?: string
          verification_token?: string | null
          verified?: boolean
          verified_at?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          organization_name: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_name: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_name?: string
        }
        Relationships: []
      }
      organizations_locations: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string
          id: string
          is_head_office: boolean
          organization_id: string
          region: string
        }
        Insert: {
          address: string
          city: string
          country: string
          created_at?: string
          id?: string
          is_head_office: boolean
          organization_id: string
          region: string
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_head_office?: boolean
          organization_id?: string
          region?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_locations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations_members: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          first_name: string
          gender: Database["public"]["Enums"]["Gender"]
          id: string
          last_name: string
          onboarding_copleted_step: number
          organization_id: string
          position: string
          role: Database["public"]["Enums"]["OrganizationMemberRole"]
          username: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          first_name: string
          gender: Database["public"]["Enums"]["Gender"]
          id: string
          last_name: string
          onboarding_copleted_step?: number
          organization_id: string
          position: string
          role: Database["public"]["Enums"]["OrganizationMemberRole"]
          username: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          first_name?: string
          gender?: Database["public"]["Enums"]["Gender"]
          id?: string
          last_name?: string
          onboarding_copleted_step?: number
          organization_id?: string
          position?: string
          role?: Database["public"]["Enums"]["OrganizationMemberRole"]
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_avatar_files: {
        Row: {
          created_at: string
          height: number
          id: string
          mime_type: string
          name: string
          size: number
          talent_id: string
          url: string
          width: number
        }
        Insert: {
          created_at?: string
          height: number
          id?: string
          mime_type: string
          name: string
          size: number
          talent_id: string
          url: string
          width: number
        }
        Update: {
          created_at?: string
          height?: number
          id?: string
          mime_type?: string
          name?: string
          size?: number
          talent_id?: string
          url?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "talent_avatar_files_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talents"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_location: {
        Row: {
          autocomplete_description: string
          city: string
          coords: unknown
          country: string
          created_at: string
          formatted_address: string
          id: string
          latitude: number
          longitude: number
          place_id: string
          postal_code: string
          region: string
          talent_id: string
        }
        Insert: {
          autocomplete_description: string
          city: string
          coords: unknown
          country: string
          created_at?: string
          formatted_address: string
          id?: string
          latitude: number
          longitude: number
          place_id: string
          postal_code: string
          region: string
          talent_id: string
        }
        Update: {
          autocomplete_description?: string
          city?: string
          coords?: unknown
          country?: string
          created_at?: string
          formatted_address?: string
          id?: string
          latitude?: number
          longitude?: number
          place_id?: string
          postal_code?: string
          region?: string
          talent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_location_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: true
            referencedRelation: "talents"
            referencedColumns: ["id"]
          },
        ]
      }
      talents: {
        Row: {
          additional_skills: string | null
          birth_date: string
          body_attributes: Database["public"]["Enums"]["BodyAttributes"] | null
          build: number | null
          created_at: string
          eye_color: Database["public"]["Enums"]["EyeColour"] | null
          facial_attributes:
            | Database["public"]["Enums"]["FacialAttributes"]
            | null
          first_name: string
          gender: Database["public"]["Enums"]["Gender"]
          hair_color: Database["public"]["Enums"]["HairColour"] | null
          height: number | null
          id: string
          last_name: string
          onboarding_copleted_step: number
          skin_tone: Database["public"]["Enums"]["SkinTone"] | null
          tattoo_spot: Database["public"]["Enums"]["TattooSpot"] | null
          username: string
        }
        Insert: {
          additional_skills?: string | null
          birth_date: string
          body_attributes?: Database["public"]["Enums"]["BodyAttributes"] | null
          build?: number | null
          created_at?: string
          eye_color?: Database["public"]["Enums"]["EyeColour"] | null
          facial_attributes?:
            | Database["public"]["Enums"]["FacialAttributes"]
            | null
          first_name: string
          gender: Database["public"]["Enums"]["Gender"]
          hair_color?: Database["public"]["Enums"]["HairColour"] | null
          height?: number | null
          id?: string
          last_name: string
          onboarding_copleted_step?: number
          skin_tone?: Database["public"]["Enums"]["SkinTone"] | null
          tattoo_spot?: Database["public"]["Enums"]["TattooSpot"] | null
          username: string
        }
        Update: {
          additional_skills?: string | null
          birth_date?: string
          body_attributes?: Database["public"]["Enums"]["BodyAttributes"] | null
          build?: number | null
          created_at?: string
          eye_color?: Database["public"]["Enums"]["EyeColour"] | null
          facial_attributes?:
            | Database["public"]["Enums"]["FacialAttributes"]
            | null
          first_name?: string
          gender?: Database["public"]["Enums"]["Gender"]
          hair_color?: Database["public"]["Enums"]["HairColour"] | null
          height?: number | null
          id?: string
          last_name?: string
          onboarding_copleted_step?: number
          skin_tone?: Database["public"]["Enums"]["SkinTone"] | null
          tattoo_spot?: Database["public"]["Enums"]["TattooSpot"] | null
          username?: string
        }
        Relationships: []
      }
      talents_full_body_photos_files: {
        Row: {
          created_at: string
          height: number
          id: string
          mime_type: string
          name: string
          size: number
          talent_id: string
          url: string
          width: number
        }
        Insert: {
          created_at?: string
          height: number
          id?: string
          mime_type: string
          name: string
          size: number
          talent_id: string
          url: string
          width: number
        }
        Update: {
          created_at?: string
          height?: number
          id?: string
          mime_type?: string
          name?: string
          size?: number
          talent_id?: string
          url?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "talents_full_body_photos_files_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talents"
            referencedColumns: ["id"]
          },
        ]
      }
      uins: {
        Row: {
          created_at: string
          id: string
          uin: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          uin: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          uin?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_exists_by_username: {
        Args: { username_param: string }
        Returns: boolean
      }
    }
    Enums: {
      Accent:
        | "native"
        | "american"
        | "foreign"
        | "australian"
        | "european"
        | "british"
        | "indian"
        | "other_doesnt_matter"
      BodyAttributes:
        | "tattoos"
        | "birthmarks"
        | "amputations"
        | "scars"
        | "burns"
      Ethnicity:
        | "asian"
        | "caucasian"
        | "african"
        | "islander"
        | "middle_eastern"
        | "indian_south_asian"
        | "latino_hispanic"
        | "mixed"
        | "other_not_sure"
      EyeColour:
        | "blue"
        | "brown"
        | "green"
        | "hazel"
        | "black"
        | "grey"
        | "amber"
        | "other_not_sure"
      FacialAttributes:
        | "birthmark"
        | "moles"
        | "scars"
        | "freckles"
        | "tattoos"
        | "burns"
      Gender: "male" | "female" | "other"
      HairColour:
        | "blue"
        | "brown"
        | "green"
        | "dyed_colored"
        | "hazel"
        | "black"
        | "grey_white"
        | "amber"
        | "bald_shaved"
        | "other_not_sure"
      OrganizationMemberRole: "owner" | "admin"
      SkinTone:
        | "porcelain"
        | "ivory"
        | "warm_ivory"
        | "sand"
        | "beige"
        | "warm_beige"
        | "natural"
        | "honey"
        | "golden"
        | "almond"
        | "chestnut"
        | "espresso"
      TattooSpot: "on_sleeves" | "on_body" | "on_neck" | "on_hand"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      Accent: [
        "native",
        "american",
        "foreign",
        "australian",
        "european",
        "british",
        "indian",
        "other_doesnt_matter",
      ],
      BodyAttributes: [
        "tattoos",
        "birthmarks",
        "amputations",
        "scars",
        "burns",
      ],
      Ethnicity: [
        "asian",
        "caucasian",
        "african",
        "islander",
        "middle_eastern",
        "indian_south_asian",
        "latino_hispanic",
        "mixed",
        "other_not_sure",
      ],
      EyeColour: [
        "blue",
        "brown",
        "green",
        "hazel",
        "black",
        "grey",
        "amber",
        "other_not_sure",
      ],
      FacialAttributes: [
        "birthmark",
        "moles",
        "scars",
        "freckles",
        "tattoos",
        "burns",
      ],
      Gender: ["male", "female", "other"],
      HairColour: [
        "blue",
        "brown",
        "green",
        "dyed_colored",
        "hazel",
        "black",
        "grey_white",
        "amber",
        "bald_shaved",
        "other_not_sure",
      ],
      OrganizationMemberRole: ["owner", "admin"],
      SkinTone: [
        "porcelain",
        "ivory",
        "warm_ivory",
        "sand",
        "beige",
        "warm_beige",
        "natural",
        "honey",
        "golden",
        "almond",
        "chestnut",
        "espresso",
      ],
      TattooSpot: ["on_sleeves", "on_body", "on_neck", "on_hand"],
    },
  },
} as const
