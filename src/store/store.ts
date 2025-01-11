import { create } from "zustand";
import { Contact } from "../types/types";

interface StoreState {
  selected: Contact | null;
  setSelectedContact: (contact: Contact) => void;
}

const useStore = create<StoreState>((set) => ({
  selected: null,
  setSelectedContact: (contact: Contact) => set(() => ({ selected: contact })),
}));

export default useStore;
