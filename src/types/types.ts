import { Database } from "../types/supabase.types"; // Adjust the path to your generated types file

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Meta = Database["public"]["Tables"]["meta"]["Row"];

export type AppContextType = {
  expanded: boolean;
  showAddContact: boolean;
  setExpanded: (value: boolean) => void;
  setShowAddContact: (value: boolean) => void;
}