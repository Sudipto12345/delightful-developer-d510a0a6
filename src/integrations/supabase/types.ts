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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      catalog_categories: {
        Row: {
          color: string
          icon: string
          image_url: string
          kind: string
          name: string
          slug: string
          sort_order: number
          tagline: string
        }
        Insert: {
          color?: string
          icon?: string
          image_url?: string
          kind?: string
          name: string
          slug: string
          sort_order?: number
          tagline?: string
        }
        Update: {
          color?: string
          icon?: string
          image_url?: string
          kind?: string
          name?: string
          slug?: string
          sort_order?: number
          tagline?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          badge: string | null
          category_slug: string
          description: string
          duration_hours: number
          id: string
          image_key: string
          image_url: string
          instructor_slug: string
          language: string
          lessons_count: number
          level: string
          modules: Json
          next_batch: string
          old_price: number | null
          outcomes: string[]
          price: number
          published: boolean
          rating: number
          requirements: string[]
          reviews_count: number
          slug: string
          sort_order: number
          students: number
          subtitle: string
          title: string
          video_url: string
        }
        Insert: {
          badge?: string | null
          category_slug: string
          description?: string
          duration_hours?: number
          id?: string
          image_key?: string
          image_url?: string
          instructor_slug: string
          language?: string
          lessons_count?: number
          level?: string
          modules?: Json
          next_batch?: string
          old_price?: number | null
          outcomes?: string[]
          price?: number
          published?: boolean
          rating?: number
          requirements?: string[]
          reviews_count?: number
          slug: string
          sort_order?: number
          students?: number
          subtitle?: string
          title: string
          video_url?: string
        }
        Update: {
          badge?: string | null
          category_slug?: string
          description?: string
          duration_hours?: number
          id?: string
          image_key?: string
          image_url?: string
          instructor_slug?: string
          language?: string
          lessons_count?: number
          level?: string
          modules?: Json
          next_batch?: string
          old_price?: number | null
          outcomes?: string[]
          price?: number
          published?: boolean
          rating?: number
          requirements?: string[]
          reviews_count?: number
          slug?: string
          sort_order?: number
          students?: number
          subtitle?: string
          title?: string
          video_url?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          amount: number
          course_slug: string
          course_title: string
          created_at: string
          id: string
          method: string
          note: string | null
          status: Database["public"]["Enums"]["enrollment_status"]
          txn_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          course_slug: string
          course_title?: string
          created_at?: string
          id?: string
          method?: string
          note?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"]
          txn_id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          course_slug?: string
          course_title?: string
          created_at?: string
          id?: string
          method?: string
          note?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"]
          txn_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          approved: boolean
          avatar_url: string
          bio: string
          courses_count: number
          experience: string
          id: string
          name: string
          rating: number
          skills: string[]
          slug: string
          sort_order: number
          students: number
          title: string
        }
        Insert: {
          approved?: boolean
          avatar_url?: string
          bio?: string
          courses_count?: number
          experience?: string
          id?: string
          name: string
          rating?: number
          skills?: string[]
          slug: string
          sort_order?: number
          students?: number
          title?: string
        }
        Update: {
          approved?: boolean
          avatar_url?: string
          bio?: string
          courses_count?: number
          experience?: string
          id?: string
          name?: string
          rating?: number
          skills?: string[]
          slug?: string
          sort_order?: number
          students?: number
          title?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string
          course_slug: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          course_slug: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          course_slug?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_webhook_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          payload: Json | null
          provider: string
        }
        Insert: {
          created_at?: string
          event_type?: string
          id: string
          payload?: Json | null
          provider?: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json | null
          provider?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category_slug: string
          deliverables: string[]
          description: string
          id: string
          name: string
          published: boolean
          slug: string
          sort_order: number
          starting_price: number
          tagline: string
          turnaround: string
        }
        Insert: {
          category_slug: string
          deliverables?: string[]
          description?: string
          id?: string
          name: string
          published?: boolean
          slug: string
          sort_order?: number
          starting_price?: number
          tagline?: string
          turnaround?: string
        }
        Update: {
          category_slug?: string
          deliverables?: string[]
          description?: string
          id?: string
          name?: string
          published?: boolean
          slug?: string
          sort_order?: number
          starting_price?: number
          tagline?: string
          turnaround?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "instructor" | "learner"
      enrollment_status: "pending" | "approved" | "rejected"
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
      app_role: ["admin", "instructor", "learner"],
      enrollment_status: ["pending", "approved", "rejected"],
    },
  },
} as const
