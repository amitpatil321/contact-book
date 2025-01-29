import { confirmPopup } from "primereact/confirmpopup";
import { ReactNode, useCallback, useMemo, useState } from "react";
import useDeleteContact from "../api/useDeleteContact";
import useFetchFavorites from "../api/useFetchFavorite";
import useToggleArchieve from "../api/useToggleArchieve";
import useToggleFavorites from "../api/useToggleFavorite";
import messages from "../constants/messages";
import { AppContext } from "../context/AppContext";
import useHandleArchieve from "../hooks/useHandleArchieve";
import useHandleDelete from "../hooks/useHandleDelete";
import useHandleFavorites from "../hooks/useHandleFavorites";
import { Contact } from "../types/types";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: favData } = useFetchFavorites();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const favoritesArr = useMemo(() => {
    if (!favData || !favData[0]?.favorites) {
      return [];
    }

    const splitFavorites = favData[0]?.favorites.split(",");
    return splitFavorites.length === 1 && splitFavorites[0] === ""
      ? []
      : splitFavorites;
  }, [favData]);

  const { mutate: toggleFavorites, isPending: favLoading } =
    useToggleFavorites();

  const { handleFavorites, favId } = useHandleFavorites(
    favoritesArr,
    toggleFavorites
  );

  const { mutate: toggleArchieveMutation, isPending: archieveLoading } =
    useToggleArchieve();
  const { mutate: deleteContactMutation, isPending: deleteLoading } =
    useDeleteContact();

  const { handleArchieve } = useHandleArchieve(toggleArchieveMutation);
  const { handleDelete } = useHandleDelete(deleteContactMutation);

  const handleFavoriteClick = useCallback(
    (event: React.MouseEvent, contactId: string) =>
      handleFavorites(event, contactId),
    [handleFavorites]
  );

  const handleToggleArchieveClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, contact: Contact) => {
      event.preventDefault();
      event.stopPropagation();
      if (contact.status === "active") {
        confirmPopup({
          target: event.currentTarget,
          message: messages.contacts.confirmArchieve,
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: () => handleArchieve(contact),
          reject: () => {
            return null;
          },
        });
      } else handleArchieve(contact);
    },
    [handleArchieve]
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
      expanded,
      setExpanded,
      showAddContact,
      setShowAddContact,
      favoritesArr,
      favId,
      favLoading,
      archieveLoading,
      deleteLoading,
      handleFavoriteClick,
      handleToggleArchieveClick,
      handleDeleteClick,
    }),
    [
      expanded,
      setExpanded,
      showAddContact,
      setShowAddContact,
      favoritesArr,
      favId,
      favLoading,
      archieveLoading,
      deleteLoading,
      handleFavoriteClick,
      handleToggleArchieveClick,
      handleDeleteClick,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
