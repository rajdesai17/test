import { createClient } from '@supabase/supabase-js';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:3000';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);