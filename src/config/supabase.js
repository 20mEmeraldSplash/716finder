import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://mhwcnhjctpgflfxklghn.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1od2NuaGpjdHBnZmxmeGtsZ2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4Mjc5MjgsImV4cCI6MjA3NjQwMzkyOH0.k3h8TcD8qXs9rkfY3fmPuG92lCVrFxjYRT-MkdtAjZA';

export const supabase = createClient(supabaseUrl, supabaseKey);
