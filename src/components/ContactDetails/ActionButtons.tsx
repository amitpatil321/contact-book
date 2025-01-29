import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { AppContextType, Contact } from "../../types/types";
import Loading from "../Loading";

interface ActionButtonProps {
  contact: Contact;
}

const ActionButton: React.FC<ActionButtonProps> = ({ contact }) => {
  const {
    favoritesArr,
    favLoading,
    archieveLoading,
    deleteLoading,
    handleFavoriteClick,
    handleToggleArchieveClick,
    handleDeleteClick,
  } = useContext(AppContext) as AppContextType;

  return (
    <div className="flex justify-start items-center gap-2 mt-2 text-gray-400 text-sm">
      <span
        className={` hover:text-pink-700 cursor-pointer ${
          favLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={(event) => handleFavoriteClick(event, contact.id)}
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
        onClick={(event) => handleToggleArchieveClick(event, contact)}
      >
        {archieveLoading ? (
          <div className="w-12">
            <Loading size="small" />
          </div>
        ) : contact.status === "archived" ? (
          "UnArchive"
        ) : (
          "Archive"
        )}
      </span>
      <span className="text-gray-400">|</span>
      <span
        className={`text-gray-400 hover:text-red-500 cursor-pointer ${
          favLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={(event) => handleDeleteClick(event, contact)}
      >
        {deleteLoading ? (
          <div className="w-10">
            <Loading size="small" />
          </div>
        ) : contact.status === "deleted" ? (
          "Restore"
        ) : (
          "Delete"
        )}
      </span>
    </div>
  );
};

export default ActionButton;
