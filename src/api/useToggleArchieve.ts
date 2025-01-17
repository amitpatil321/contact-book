import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

const archieveContact = async (
  contactId: string,
  currentStatus: string
): Promise<Contact> => {
  const status = currentStatus === "active" ? "archieved" : "active";
  const { data, error } = await supabase
    .from(TABLES.contacts)
    .update({ status })
    .eq("id", contactId)
    .single();

  if (error) throw new Error(error.message);

  return data as Contact;
};

interface ToggleArchiveVariables {
  contactId: string;
  currentStatus: string;
}

const useToggleArchieve = (): UseMutationResult<
  Contact,
  Error,
  ToggleArchiveVariables
> => {
  return useMutation<Contact, Error, ToggleArchiveVariables>({
    mutationFn: async ({ contactId, currentStatus }) =>
      await archieveContact(contactId, currentStatus),
  });
};

export default useToggleArchieve;
