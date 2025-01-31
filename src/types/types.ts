import { VALID_ACTIONS } from "../constants/constants";
import { Database } from "../types/supabase.types";

export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Meta = Database["public"]["Tables"]["meta"]["Row"];
export type Favorites = Database["public"]["Tables"]["favorites"]["Row"];

export interface AppContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  showAddContact: boolean;
  setShowAddContact: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: { id: string; contact_id: string }[] | undefined;
  favId: string | null;
  favLoading: boolean;
  // handleFavorites: (event: React.MouseEvent, id: string) => void;
  archiveLoading: boolean;
  deleteLoading: boolean;
  handleFavoriteClick: (event: React.MouseEvent, contactId: string) => void;
  handleDeleteClick: (
    event: React.MouseEvent<HTMLElement>,
    contact: Contact
  ) => void;
  handleToggleArchiveClick: (
    event: React.MouseEvent<HTMLElement>,
    contact: Contact
  ) => void;
}

export type ContactStatusTypes =
  | "active"
  | "favorites"
  | "archived"
  | "deleted";

export type ContactActionTypes = keyof typeof VALID_ACTIONS;
