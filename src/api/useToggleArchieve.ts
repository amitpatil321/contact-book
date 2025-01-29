import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

type ArchieveContactResponse = "active" | "archived";

const archieveContact = async (
  contact: Contact
): Promise<ArchieveContactResponse> => {
  const status = contact.status === "active" ? "archived" : "active";
  const { error } = await supabase
    .from(TABLES.contacts)
    .update({ status })
    .eq("id", contact.id)
    .single();

  if (error)
    throw new Error(
      contact.status !== "archived"
        ? messages.contacts.unarchieveError
        : messages.contacts.archieveError
    );

  return status;
};

const useToggleArchieve = (): UseMutationResult<
  ArchieveContactResponse,
  Error,
  Contact
> => {
  return useMutation<ArchieveContactResponse, Error, Contact>({
    mutationFn: async (contact) => await archieveContact(contact),
  });
};

export default useToggleArchieve;
