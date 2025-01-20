import { create } from "zustand";
import { Contact } from "../types/types";

interface StoreState {
  selected: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
}

const useStore = create<StoreState>((set) => ({
  selected: null,
  setSelectedContact: (contact: Contact | null) =>
    set(() => {
      return { selected: contact };
    }),
}));

export default useStore;
