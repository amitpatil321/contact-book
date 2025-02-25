import React, { useContext } from "react";
import { VALID_ACTIONS } from "../../constants/constants";
import { AppContext } from "../../context/AppContext";
import { AppContextType, Contact, ContactActionTypes } from "../../types/types";
import Loading from "../Loading";

interface ActionButtonProps {
  contact: Contact;
}

const ActionButton: React.FC<ActionButtonProps> = ({ contact }) => {
  const {
    favorites,
    favLoading,
    archiveLoading,
    deleteLoading,
    handleFavoriteClick,
    handleToggleArchiveClick,
    handleDeleteClick,
  } = useContext(AppContext) as AppContextType;

  const status = contact.status as ContactActionTypes | null;

  return (
    <div className="flex justify-start items-center gap-2 mt-2 text-gray-400 text-sm">
      {status && VALID_ACTIONS[status]?.includes("edit") && (
        <>
          <span className="hover:text-purple-500 cursor-pointer">Edit</span>
          <span className="text-gray-400">|</span>
        </>
      )}

      {status && VALID_ACTIONS[status]?.includes("favorite") && (
        <>
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
            ) : favorites?.find((each) => each.id === contact.id) ? (
              "Unfavorite"
            ) : (
              "Favorite"
            )}
          </span>
          <span className="text-gray-400">|</span>
        </>
      )}

      {status && VALID_ACTIONS[status]?.includes("archive") && (
        <>
          <span
            className={`hover:text-purple-500 cursor-pointer ${
              archiveLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={(event) => handleToggleArchiveClick(event, contact)}
          >
            {archiveLoading ? (
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
        </>
      )}

      {status && VALID_ACTIONS[status]?.includes("delete") && (
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
      )}
    </div>
  );
};

export default ActionButton;
