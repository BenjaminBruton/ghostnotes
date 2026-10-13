import { createClient } from '@supabase/supabase-js';

// Use server-side only environment variables (no NEXT_PUBLIC_ prefix)
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;
};