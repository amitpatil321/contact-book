import { Database } from "../types/supabase.types";

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Meta = Database["public"]["Tables"]["meta"]["Row"];
export type Favorites = Database["public"]["Tables"]["favorites"]["Row"];

export type AppContextType = {
  expanded: boolean;
  showAddContact: boolean;
  setExpanded: (value: boolean) => void;
  setShowAddContact: (value: boolean) => void;
}