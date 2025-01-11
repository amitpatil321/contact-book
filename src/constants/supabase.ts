import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase.types";

console.log(import.meta.env);

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default supabase;
