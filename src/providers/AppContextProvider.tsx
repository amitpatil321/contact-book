import { confirmPopup } from "primereact/confirmpopup";
import { ReactNode, useCallback, useMemo } from "react";
import useDeleteContact from "../api/useDeleteContact";
import useFetchFavorites from "../api/useFetchFavorite";
import useToggleArchive from "../api/useToggleArchieve";
import useToggleFavorites from "../api/useToggleFavorite";
import messages from "../constants/messages";
import { AppContext } from "../context/AppContext";
import useHandleArchive from "../hooks/useHandleArchieve";
import useHandleDelete from "../hooks/useHandleDelete";
import useHandleFavorites from "../hooks/useHandleFavorites";
import { Contact } from "../types/types";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: favorites } = useFetchFavorites();

  const { mutate: toggleFavorites, isPending: favLoading } =
    useToggleFavorites();
  const { mutate: toggleArchiveMutation, isPending: archiveLoading } =
    useToggleArchive();
  const { mutate: deleteContactMutation, isPending: deleteLoading } =
    useDeleteContact();

  const { handleFavorites, favId } = useHandleFavorites(toggleFavorites);
  const { handleArchive } = useHandleArchive(toggleArchiveMutation);
  const { handleDelete } = useHandleDelete(deleteContactMutation);

  const handleFavoriteClick = useCallback(
    (event: React.MouseEvent, contactId: string) => {
      handleFavorites(event, contactId);
    },
    [handleFavorites]
  );

  const handleToggleArchiveClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, contact: Contact) => {
      event.preventDefault();
      event.stopPropagation();
      if (contact.status === "active") {
        confirmPopup({
          target: event.currentTarget,
          message: messages.contacts.confirmArchive,
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: () => handleArchive(contact),
          reject: () => {
            return null;
          },
        });
      } else handleArchive(contact);
    },
    [handleArchive]
  );

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, contact: Contact) => {
      event.preventDefault();
      event.stopPropagation();
      if (contact.status !== "deleted") {
        confirmPopup({
          target: event.currentTarget,
          message: messages.contacts.confirmDelete,
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: () => handleDelete(contact),
          reject: () => {
            return null;
          },
        });
      } else handleDelete(contact);
    },
    [handleDelete]
  );

  const contextValue = useMemo(
    () => ({
      favorites,
      favId,
      favLoading,
      archiveLoading,
      deleteLoading,
      handleFavoriteClick,
      handleToggleArchiveClick,
      handleDeleteClick,
    }),
    [
      favorites,
      favId,
      favLoading,
      archiveLoading,
      deleteLoading,
      handleFavoriteClick,
      handleToggleArchiveClick,
      handleDeleteClick,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
