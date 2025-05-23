export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          mobile: string
          profile_pic: string | null
          status: Database["public"]["Enums"]["contact_status"]
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          mobile: string
          profile_pic?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          mobile?: string
          profile_pic?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
        }
        Relationships: []
      }
      favorites: {
        Row: {
          contact_id: string
          id: string
        }
        Insert: {
          contact_id: string
          id?: string
        }
        Update: {
          contact_id?: string
          id?: string
        }
        Relationships: []
      }
      labels: {
        Row: {
          color: string | null
          created_at: string
          id: number
          label: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          label?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          label?: number | null
        }
        Relationships: []
      }
      meta: {
        Row: {
          birthdate: string | null
          contact_id: string
          created_at: string
          github: string | null
          home_address1: string | null
          home_address2: string | null
          home_city: string | null
          home_country: string | null
          home_state: string | null
          home_zip: string | null
          id: string
          linkedin: string | null
          notes: string | null
          website: string | null
          work_address1: string | null
          work_address2: string | null
          work_city: string | null
          work_company: string | null
          work_country: string | null
          work_designation: string | null
          work_state: string | null
          work_zip: string | null
        }
        Insert: {
          birthdate?: string | null
          contact_id: string
          created_at?: string
          github?: string | null
          home_address1?: string | null
          home_address2?: string | null
          home_city?: string | null
          home_country?: string | null
          home_state?: string | null
          home_zip?: string | null
          id?: string
          linkedin?: string | null
          notes?: string | null
          website?: string | null
          work_address1?: string | null
          work_address2?: string | null
          work_city?: string | null
          work_company?: string | null
          work_country?: string | null
          work_designation?: string | null
          work_state?: string | null
          work_zip?: string | null
        }
        Update: {
          birthdate?: string | null
          contact_id?: string
          created_at?: string
          github?: string | null
          home_address1?: string | null
          home_address2?: string | null
          home_city?: string | null
          home_country?: string | null
          home_state?: string | null
          home_zip?: string | null
          id?: string
          linkedin?: string | null
          notes?: string | null
          website?: string | null
          work_address1?: string | null
          work_address2?: string | null
          work_city?: string | null
          work_company?: string | null
          work_country?: string | null
          work_designation?: string | null
          work_state?: string | null
          work_zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meta_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_status: "active" | "deleted" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
