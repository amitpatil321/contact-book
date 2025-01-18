import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

const archieveContact = async (contact: Contact): Promise<Contact> => {
  const status = contact.status === "active" ? "archieved" : "active";
  const { data, error } = await supabase
    .from(TABLES.contacts)
    .update({ status })
    .eq("id", contact.id)
    .single();

  if (error) throw new Error(error.message);

  return data as Contact;
};

const useToggleArchieve = (): UseMutationResult<Contact, Error, Contact> => {
  return useMutation<Contact, Error, Contact>({
    mutationFn: async (contact) => await archieveContact(contact),
  });
};

export default useToggleArchieve;
