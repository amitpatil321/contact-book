// export interface Contact {
//   birthdate: string | null;
//   created_at: string;
//   email: string | null;
//   first_name: string | null;
//   id: number;
//   last_name: string | null;
//   mobile: string | null;
//   profile_pic: string | null;
// }

import { Database } from "../types/supabase.types"; // Adjust the path to your generated types file

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Meta = Database["public"]["Tables"]["meta"]["Row"];
