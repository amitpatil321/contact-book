import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

const deleteContact = async (contactId: string): Promise<Contact> => {
  const { data, error } = await supabase
    .from(TABLES.contacts)
    .update({ status: "deleted" })
    .eq("id", contactId)
    .single();

  if (error) throw new Error(messages.contacts.deleteError);

  return data as Contact;
};

const useDeleteContact = (): UseMutationResult<Contact, Error, string> => {
  return useMutation<Contact, Error, string>({
    mutationFn: async (contactId) => deleteContact(contactId),
  });
};

export default useDeleteContact;
