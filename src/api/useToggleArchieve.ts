import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

type ArchiveContactResponse = "active" | "archived";

const archiveContact = async (
  contact: Contact
): Promise<ArchiveContactResponse> => {
  const status = contact.status === "active" ? "archived" : "active";
  const { error } = await supabase
    .from(TABLES.contacts)
    .update({ status })
    .eq("id", contact.id)
    .single();

  if (error)
    throw new Error(
      contact.status !== "archived"
        ? messages.contacts.unarchiveError
        : messages.contacts.archiveError
    );

  return status;
};

const useToggleArchive = (): UseMutationResult<
  ArchiveContactResponse,
  Error,
  Contact
> => {
  return useMutation<ArchiveContactResponse, Error, Contact>({
    mutationFn: async (contact) => await archiveContact(contact),
  });
};

export default useToggleArchive;
