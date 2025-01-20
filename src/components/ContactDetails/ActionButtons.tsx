import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import React, { useCallback, useContext } from "react";
import useDeleteContact from "../../api/useDeleteContact";
import useToggleArchieve from "../../api/useToggleArchieve";
import messages from "../../constants/messages";
import { AppContext } from "../../context/AppContext";
import useHandleArchieve from "../../hooks/useHandleArchieve";
import useHandleDelete from "../../hooks/useHandleDelete";
import { AppContextType, Contact } from "../../types/types";
import Loading from "../Loading";

interface ActionButtonProps {
  contact: Contact;
}

const ActionButton: React.FC<ActionButtonProps> = ({ contact }) => {
  const { favoritesArr, favLoading, handleFavorites } = useContext(
    AppContext
  ) as AppContextType;

  const { mutate: toggleArchieveMutation, isPending: archieveLoading } =
    useToggleArchieve();
  const { mutate: deleteContactMutation, isPending: deleteLoading } =
    useDeleteContact();

  const { handleArchieve } = useHandleArchieve(toggleArchieveMutation);
  const { handleDelete } = useHandleDelete(deleteContactMutation);

  const handleFavoriteClick = useCallback(
    (event: React.MouseEvent) => handleFavorites(event, contact.id),
    [handleFavorites, contact.id]
  );

  const handleToggleArchieveClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
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
    },
    [contact, handleArchieve]
  );

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: messages.contacts.confirmDelete,
        icon: "pi pi-exclamation-triangle",
        defaultFocus: "accept",
        accept: () => handleDelete(contact?.id),
        reject: () => {
          return null;
        },
      });
    },
    [handleDelete, contact]
  );

  return (
    <div className="flex justify-start items-center gap-2 mt-2 text-gray-400 text-sm">
      <span
        className={` hover:text-pink-700 cursor-pointer ${
          favLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={handleFavoriteClick}
      >
        {favLoading ? (
          <div className="w-14">
            <Loading />
          </div>
        ) : favoritesArr?.includes(contact.id) ? (
          "Unfavorite"
        ) : (
          "Favorite"
        )}
      </span>
      <span className="text-gray-400">|</span>
      <span className="hover:text-purple-500 cursor-pointer">Edit</span>
      <span className="text-gray-400">|</span>
      <span
        className={`hover:text-purple-500 cursor-pointer ${
          archieveLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={handleToggleArchieveClick}
      >
        {archieveLoading ? (
          <div className="w-12">
            <Loading size="small" />
          </div>
        ) : (
          "Archive"
        )}
      </span>
      <ConfirmPopup />
      <span className="text-gray-400">|</span>
      {/* <Button
        link
        className="px-1 text-gray-400 hover:text-red-500 cursor-pointer"
        onClick={handleDeleteClick}
      >
        {deleteLoading ? (
          <div className="w-4">
            <Loading size="small" />
          </div>
        ) : (
          "Delete"
        )}
      </Button> */}
      <span
        className={`text-gray-400 hover:text-red-500 cursor-pointer ${
          favLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={handleDeleteClick}
      >
        {deleteLoading ? (
          <div className="w-10">
            <Loading size="small" />
          </div>
        ) : (
          "Delete"
        )}
      </span>
    </div>
  );
};

export default ActionButton;
