import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

const saveContact = async (contact: Contact): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from(TABLES.contacts)
    .insert({ ...contact }).select();

  if (error) {
    throw new Error("Error saving contact information!");
  }

  return data  as Contact[];
};


const useSaveContact = (): UseMutationResult<Contact[], Error, Contact> => {
  return useMutation<Contact[], Error, Contact>({
    mutationFn: async (contact) => await saveContact(contact),
  });
};

export default useSaveContact;