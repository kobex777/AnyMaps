/**
 * Supabase Database Types
 * Auto-generated from Supabase schema
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            map_versions: {
                Row: {
                    content: Json
                    created_at: string | null
                    id: string
                    map_id: string
                    mermaid_syntax: string | null
                }
                Insert: {
                    content?: Json
                    created_at?: string | null
                    id?: string
                    map_id: string
                    mermaid_syntax?: string | null
                }
                Update: {
                    content?: Json
                    created_at?: string | null
                    id?: string
                    map_id?: string
                    mermaid_syntax?: string | null
                }
            }
            maps: {
                Row: {
                    created_at: string | null
                    id: string
                    is_public: boolean | null
                    title: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    is_public?: boolean | null
                    title?: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    is_public?: boolean | null
                    title?: string
                    updated_at?: string | null
                    user_id?: string
                }
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    email: string | null
                    full_name: string | null
                    id: string
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    email?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                }
            }
        }
        Views: {}
        Functions: {}
        Enums: {}
    }
}
