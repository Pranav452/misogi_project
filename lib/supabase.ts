import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client with additional options for better Next.js compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for server-side rendering
  },
})

export interface StudentData {
  id?: string
  emai: string // Note: column name in database is 'emai' not 'email'
  name: string
  education: string
  experience: string
  skills: string
  github: string
  deployed: string
  demo_video: string
  photo_link: string
  created_at?: string
  updated_at?: string
}

export interface NormalizedStudent {
  id: string
  email: string
  name: string
  education: {
    degree: string
    institution: string
    field: string
    grade?: number
    year?: string
  }[]
  experience: {
    company: string
    role: string
    duration: string
    description: string[]
  }[]
  skills: {
    category: string
    items: string[]
  }[]
  github: string
  deployed: string
  demo_video: string
  photo_link: string
  created_at?: string
  updated_at?: string
}
