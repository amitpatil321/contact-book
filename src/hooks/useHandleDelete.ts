import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import messages from "../constants/messages";
import useStore from "../store/store";
import { useToast } from "./useToast";

interface deleteContactMutationType {
  onSuccess: () => void;
  onError: () => void;
}

const useHandleDelete = (
  deleteContactMutation: (
    contactId: string,
    options: deleteContactMutationType
  ) => void
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const { setSelectedContact } = useStore();

  const handleDelete = useCallback(
    (contactId: string) => {
      deleteContactMutation(contactId, {
        onSuccess: () => {
          setSelectedContact(null);
          showToast("success", "Success", messages.contacts.deleteSuccess);
          queryClientObj.invalidateQueries({ queryKey: ["fetchContacts"] });
        },
        onError: () => {
          showToast("error", "Error", messages.contacts.deleteError);
        },
      });
    },
    [deleteContactMutation, queryClientObj, setSelectedContact, showToast]
  );

  return { handleDelete };
};

export default useHandleDelete;
