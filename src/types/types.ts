import { Database } from "../types/supabase.types";

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Meta = Database["public"]["Tables"]["meta"]["Row"];
export type Favorites = Database["public"]["Tables"]["favorites"]["Row"];

export interface AppContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  showAddContact: boolean;
  setShowAddContact: React.Dispatch<React.SetStateAction<boolean>>;
  favoritesArr: string[] | null | undefined;
  favId: string | null;
  favLoading: boolean;
  handleFavorites: (event: React.MouseEvent, id: string) => void;
}

export type ContactStatusTypes = "active" | "archived" | "deleted";
