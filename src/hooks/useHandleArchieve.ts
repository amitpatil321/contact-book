import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import messages from "../constants/messages";
import useStore from "../store/store";
import { Contact } from "../types/types";
import { useToast } from "./useToast";

interface toggleArchieveType {
  onSuccess: () => void;
  onError: () => void;
  onSettled: () => void;
}

const useHandleArchieve = (
  toggleArchieve: (contact: Contact, options: toggleArchieveType) => void
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const [archieveLoading, setArchieveLoading] = useState<boolean>(false);
  const { setSelectedContact } = useStore();

  const handleArchieve = useCallback(
    (contact: Contact) => {
      setArchieveLoading(true);

      toggleArchieve(contact, {
        onSuccess: () => {
          setSelectedContact(null);
          showToast("success", "Success", messages.contacts.archieveSuccess);
          queryClientObj.invalidateQueries({ queryKey: ["fetchContacts"] });
        },
        onError: () => {
          showToast("error", "Error", messages.contacts.archieveError);
        },
        onSettled: () => {
          setArchieveLoading(false);
        },
      });
    },
    [toggleArchieve, setSelectedContact, showToast, queryClientObj]
  );

  return { archieveLoading, handleArchieve };
};

export default useHandleArchieve;
