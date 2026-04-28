import { createClient } from '@supabase/supabase-js';

const getEnvVar = (name: string) => {
  return (import.meta as any).env[name] || '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

const isValidUrl = (url: string) => {
  try {
    return url && url.startsWith('http');
  } catch {
    return false;
  }
};

export const supabase = (isValidUrl(supabaseUrl) && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export const getSupabase = () => supabase;
