import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.VITE_APP_SUPABASE_URL,
  import.meta.VITE_APP_SUPABASE_ANON_KEY,
);

export default supabase;
