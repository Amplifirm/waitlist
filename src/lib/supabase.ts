import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vaxgjwmmkjhceulkmxuc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZheGdqd21ta2poY2V1bGtteHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTQ1MTAsImV4cCI6MjA4MjA3MDUxMH0.Y6SHdG4PMp4K59FCE6gJZ-kPbhcb7VGKG1f0LXgVkus';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
