import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import messages from "../constants/messages";
import useStore from "../store/store";
import { Contact } from "../types/types";
import { useToast } from "./useToast";

type DeleteContactResponse = "active" | "deleted";

// type DeleteContactMutationType = {
//   onSuccess?: (response: DeleteContactResponse) => void;
//   onError?: (error: string) => void;
// };

type DeleteContactMutationTypeFn = UseMutateFunction<
  DeleteContactResponse,
  Error,
  Contact,
  unknown
>;

// const useHandleDelete = (
//   deleteContactMutation: (
//     contact: Contact,
//     options: DeleteContactMutationType
//   ) => void
// ) => {

const useHandleDelete = (
  deleteContactMutation: DeleteContactMutationTypeFn
) => {
  const { showToast } = useToast();
  const queryClientObj = useQueryClient();
  const { setSelectedContact } = useStore();

  const handleDelete = useCallback(
    (contact: Contact) => {
      deleteContactMutation(contact, {
        onSuccess: (status: DeleteContactResponse) => {
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
