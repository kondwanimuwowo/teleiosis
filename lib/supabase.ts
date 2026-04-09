import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Teaching {
  id: string
  title: string
  description: string
  speaker?: string
  category_id: string
  duration_minutes: number
  published_date: string
  audio_url: string
  thumbnail_url?: string
  price?: number
  included_in_membership: boolean
  created_at: string
  updated_at: string
}

export interface TeachingCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface AudioFile {
  id: string
  teaching_id: string
  filename: string
  cloudflare_url: string
  file_size_mb: number
  duration_seconds: number
  created_at: string
}
