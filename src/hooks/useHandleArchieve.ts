import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import messages from "../constants/messages";
import useStore from "../store/store";
import { Contact } from "../types/types";
import { useToast } from "./useToast";

type ArchiveContactResponse = "active" | "archived";

// interface toggleArchiveType {
//   onSuccess: () => void;
//   onError: () => void;
// }

type ArchiveContactMutationTypeFn = UseMutateFunction<
  ArchiveContactResponse,
  Error,
  Contact,
  unknown
>;

const useHandleArchive = (
  toggleArchiveMutation: ArchiveContactMutationTypeFn
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const { setSelectedContact } = useStore();

  const handleArchive = useCallback(
    (contact: Contact) => {
      toggleArchiveMutation(contact, {
        onSuccess: (status: ArchiveContactResponse) => {
          setSelectedContact(null);
          showToast(
            "success",
            "Success",
            status === "active"
              ? messages.contacts.unarchiveSuccess
              : messages.contacts.archiveSuccess
          );
          queryClientObj.invalidateQueries({ queryKey: ["fetchContacts"] });
        },
        onError: () => {
          showToast("error", "Error", messages.contacts.archiveError);
        },
      });
    },
    [toggleArchiveMutation, setSelectedContact, showToast, queryClientObj]
  );

  return { handleArchive };
};

export default useHandleArchive;
