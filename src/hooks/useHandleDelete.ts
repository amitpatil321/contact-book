import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import messages from "../constants/messages";
import useStore from "../store/store";
import { Contact } from "../types/types";
import { useToast } from "./useToast";

type DeleteContactMutationType = {
  onSuccess?: (response: "active" | "deleted") => void;
  onError?: (error: string) => void;
};

const useHandleDelete = (
  deleteContactMutation: (
    contact: Contact,
    options: DeleteContactMutationType
  ) => void
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const { setSelectedContact } = useStore();

  const handleDelete = useCallback(
    (contact: Contact) => {
      deleteContactMutation(contact, {
        onSuccess: (status: "active" | "deleted") => {
          console.log(status);
          setSelectedContact(null);
          showToast(
            "success",
            "Success",
            status === "active"
              ? messages.contacts.restoreSuccess
              : messages.contacts.deleteSuccess
          );
          queryClientObj.invalidateQueries({ queryKey: ["fetchContacts"] });
        },
        onError: (error: string) => {
          console.error(error);
          showToast("error", "Error", messages.contacts.deleteError);
        },
      });
    },
    [deleteContactMutation, queryClientObj, setSelectedContact, showToast]
  );

  return { handleDelete };
};

export default useHandleDelete;
