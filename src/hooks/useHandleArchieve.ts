import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import messages from "../constants/messages";
import useStore from "../store/store";
import { Contact } from "../types/types";
import { useToast } from "./useToast";

interface toggleArchieveType {
  onSuccess: () => void;
  onError: () => void;
}

const useHandleArchieve = (
  toggleArchieveMutation: (
    contact: Contact,
    options: toggleArchieveType
  ) => void
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const { setSelectedContact } = useStore();

  const handleArchieve = useCallback(
    (contact: Contact) => {
      toggleArchieveMutation(contact, {
        onSuccess: () => {
          setSelectedContact(null);
          showToast("success", "Success", messages.contacts.archieveSuccess);
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
