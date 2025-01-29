import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import messages from "../constants/messages";
import useStore from "../store/store";
import { Contact } from "../types/types";
import { useToast } from "./useToast";

type ArchiveContactResponse = "active" | "deleted";

// interface toggleArchieveType {
//   onSuccess: () => void;
//   onError: () => void;
// }

type ArchiveContactMutationTypeFn = UseMutateFunction<
  ArchiveContactResponse,
  Error,
  Contact,
  unknown
>;

const useHandleArchieve = (
  toggleArchieveMutation: ArchiveContactMutationTypeFn
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const { setSelectedContact } = useStore();

  const handleArchieve = useCallback(
    (contact: Contact) => {
      toggleArchieveMutation(contact, {
        onSuccess: (status: ArchiveContactResponse) => {
          setSelectedContact(null);
          showToast(
            "success",
            "Success",
            status === "active"
              ? messages.contacts.unarchieveSuccess
              : messages.contacts.archieveSuccess
          );
          queryClientObj.invalidateQueries({ queryKey: ["fetchContacts"] });
        },
        onError: () => {
          showToast("error", "Error", messages.contacts.archieveError);
        },
      });
    },
    [toggleArchieveMutation, setSelectedContact, showToast, queryClientObj]
  );

  return { handleArchieve };
};

export default useHandleArchieve;
