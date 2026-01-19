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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      alert_history: {
        Row: {
          alert_id: string
          id: string
          is_read: boolean | null
          message: string | null
          triggered_at: string
          user_id: string
        }
        Insert: {
          alert_id: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          triggered_at?: string
          user_id: string
        }
        Update: {
          alert_id?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          triggered_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_history_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "user_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          is_default: boolean | null
          name: string
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      categorization_rules: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_active: boolean | null
          keywords: string[]
          priority: number | null
          rule_name: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keywords: string[]
          priority?: number | null
          rule_name: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keywords?: string[]
          priority?: number | null
          rule_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorization_rules_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string | null
          color: string | null
          created_at: string
          current_amount: number | null
          deadline: string | null
          icon: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["goal_status"] | null
          target_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string
          current_amount?: number | null
          deadline?: string | null
          icon?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["goal_status"] | null
          target_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string
          current_amount?: number | null
          deadline?: string | null
          icon?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["goal_status"] | null
          target_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recurring_transactions: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string
          description: string | null
          end_date: string | null
          frequency: Database["public"]["Enums"]["recurrence_frequency"]
          frequency_interval: number | null
          id: string
          is_active: boolean | null
          last_execution_date: string | null
          next_execution_date: string
          payment_method: string | null
          start_date: string
          template_id: string | null
          template_name: string
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          frequency: Database["public"]["Enums"]["recurrence_frequency"]
          frequency_interval?: number | null
          id?: string
          is_active?: boolean | null
          last_execution_date?: string | null
          next_execution_date: string
          payment_method?: string | null
          start_date: string
          template_id?: string | null
          template_name: string
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          frequency?: Database["public"]["Enums"]["recurrence_frequency"]
          frequency_interval?: number | null
          id?: string
          is_active?: boolean | null
          last_execution_date?: string | null
          next_execution_date?: string
          payment_method?: string | null
          start_date?: string
          template_id?: string | null
          template_name?: string
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_transactions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "transaction_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_templates: {
        Row: {
          amount: number | null
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          payment_method: string | null
          tags: string[] | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          payment_method?: string | null
          tags?: string[] | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          payment_method?: string | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string
          date: string
          description: string
          id: string
          notes: string | null
          payment_method: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          tags: string[] | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string
          date?: string
          description: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          tags?: string[] | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string
          date?: string
          description?: string
          id?: string
          notes?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          category_id: string | null
          created_at: string
          frequency: string | null
          id: string
          is_active: boolean | null
          last_triggered: string | null
          message: string | null
          threshold_value: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          category_id?: string | null
          created_at?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          message?: string | null
          threshold_value?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          category_id?: string | null
          created_at?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          message?: string | null
          threshold_value?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_alerts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_onboarding: {
        Row: {
          completed: boolean | null
          created_at: string
          current_step: number | null
          id: string
          steps_completed: Json | null
          updated_at: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          current_step?: number | null
          id: string
          steps_completed?: Json | null
          updated_at?: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          current_step?: number | null
          id?: string
          steps_completed?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_onboarding_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          currency: string | null
          date_format: string | null
          email_notifications: boolean | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          show_balance: boolean | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          date_format?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          show_balance?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          date_format?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          show_balance?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      alert_type:
        | "budget_exceeded"
        | "goal_reached"
        | "bill_due"
        | "low_balance"
        | "unusual_spending"
        | "custom"
      app_role: "admin" | "moderator" | "user"
      goal_status: "active" | "completed" | "cancelled"
      recurrence_frequency: "daily" | "weekly" | "monthly" | "yearly"
      transaction_status: "completed" | "pending" | "cancelled"
      transaction_type: "income" | "expense"
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
      alert_type: [
        "budget_exceeded",
        "goal_reached",
        "bill_due",
        "low_balance",
        "unusual_spending",
        "custom",
      ],
      app_role: ["admin", "moderator", "user"],
      goal_status: ["active", "completed", "cancelled"],
      recurrence_frequency: ["daily", "weekly", "monthly", "yearly"],
      transaction_status: ["completed", "pending", "cancelled"],
      transaction_type: ["income", "expense"],
    },
  },
} as const
