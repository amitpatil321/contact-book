import { create } from "zustand";
import { Contact, Favorites } from "../types/types";

interface StoreState {
  contacts: Contact[] | null;
  favorites: Favorites[] | null;
  selected: Contact | null;
  showAddContactForm: boolean;
  setSelectedContact: (contact: Contact | null) => void;
  setContacts: (contacts: Contact[] | null) => void;
  setFavorites: (favorites: Favorites[] | null) => void;
}

const useStore = create<StoreState>((set) => ({
  showAddContactForm: false,
  contacts: [],
  favorites: [],
  selected: null,
  setFavorites: (favorites: Favorites[] | null) =>
    set(() => {
      return { favorites };
    }),
  setContacts: (contacts: Contact[] | null) =>
    set(() => {
      return { contacts };
    }),
  setSelectedContact: (contact: Contact | null) =>
    set(() => {
      return { selected: contact };
    }),
}));

export default useStore;
