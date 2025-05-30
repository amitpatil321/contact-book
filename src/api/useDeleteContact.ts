import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

type DeleteContactResponse = "active" | "deleted";

const deleteContact = async (
  contact: Contact
): Promise<DeleteContactResponse> => {
  const status = contact.status === "deleted" ? "active" : "deleted";

  const { error } = await supabase
    .from(TABLES.contacts)
    .update({ status })
    .eq("id", contact.id)
    .single();

  if (error) {
    throw new Error(
      contact.status === "deleted"
        ? messages.contacts.restoreError
        : messages.contacts.deleteError
    );
  }

  return status;
};

const useDeleteContact = (): UseMutationResult<
  DeleteContactResponse,
  Error,
  Contact
> => {
  return useMutation<DeleteContactResponse, Error, Contact>({
    mutationFn: async (contact) => deleteContact(contact),
  });
};

export default useDeleteContact;
