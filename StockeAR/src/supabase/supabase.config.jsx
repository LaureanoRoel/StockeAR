console.log("Supabase URL:", import.meta.env.VITE_APP_SUPABASE_URL);
console.log("Supabase KEY:", import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
import {createClient} from "@supabase/supabase-js"

export const supabase = createClient (
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
)