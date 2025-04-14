import { create } from "zustand";
import { Contact, Favorites } from "../types/types";

interface StoreState {
  addContactForm: boolean;
  sidebarExpanded: boolean;
  contacts: Contact[] | null;
  favorites: Favorites[] | null;
  selectedContact: Contact | null;
  showAddContactForm: boolean;
  setSelectedContact: (contact: Contact | null) => void;
  setContacts: (contacts: Contact[] | null) => void;
  setFavorites: (favorites: Favorites[] | null) => void;
  setSidebarState: (isOpen: boolean) => void;
  setShowAddContact: (isOpen: boolean) => void;
}

// Zustand Store
const useStore = create<StoreState>((set) => ({
  addContactForm: false,
  sidebarExpanded: false,
  showAddContactForm: false,
  contacts: [],
  favorites: [],
  selectedContact: null,
  setFavorites: (favorites) => set({ favorites }),
  setContacts: (contacts) => set({ contacts }),
  setSelectedContact: (contact) => set({ selectedContact: contact ?? null }),
  setSidebarState: (isOpen) => set({ sidebarExpanded: isOpen }),
  setShowAddContact: (isOpen) => set({ showAddContactForm: isOpen }),
}));

export default useStore;

export const useGetSidebarState = () =>
  useStore((state) => state.sidebarExpanded);
export const useContacts = () => useStore((state) => state.contacts);
export const useFavorites = () => useStore((state) => state.favorites);
export const useSelectedContact = () =>
  useStore((state) => state.selectedContact);
export const useShowAddContactForm = () =>
  useStore((state) => state.showAddContactForm);
export const useSetSelectedContact = () =>
  useStore((state) => state.setSelectedContact);
