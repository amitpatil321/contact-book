import { Tooltip } from "primereact/tooltip";
import { useContext } from "react";
import { VALID_ACTIONS } from "../../constants/constants";
import { AppContext } from "../../context/AppContext";
import useStore from "../../store/store";
import { AppContextType, Contact, ContactActionTypes } from "../../types/types";
import Loading from "../Loading";

const ListActionButtons: React.FC<{ contact: Contact }> = ({ contact }) => {
  const {
    favId,
    favLoading,
    handleToggleArchiveClick,
    handleFavoriteClick,
    handleDeleteClick,
  } = useContext(AppContext) as AppContextType;
  const { favorites } = useStore();
  const { id } = contact;

  const status = contact.status as ContactActionTypes | null;

  return (
    <>
      <div className="flex justify-evenly items-start md:items-center opacity-0 group-hover:opacity-100 w-[13%] text-gray-400 transition-opacity duration-300">
        {status && VALID_ACTIONS[status]?.includes("edit") && (
          <>
            <i
              className="pi pi-pencil"
              data-pr-tooltip="Edit"
              id={`edit-${contact.id}`}
            />
            <Tooltip
              autoHide
              target={`#edit-${contact.id}`}
              position="top"
              className="purple-tooltip"
            />
          </>
        )}
        {status && VALID_ACTIONS[status]?.includes("delete") && (
          <>
            <i
              className="hover:text-red-300 pi pi-trash"
              data-pr-tooltip={
                contact.status === "deleted" ? "Restore" : "Delete"
              }
              id={`delete-${contact.id}`}
              onClick={(event) => handleDeleteClick(event, contact)}
            />
            <Tooltip autoHide target={`#delete-${contact.id}`} position="top" />
          </>
        )}
        {status && VALID_ACTIONS[status]?.includes("archive") && (
          <>
            <i
              className="pi pi-box"
              data-pr-tooltip={
                contact.status === "archived" ? "UnArchive" : "Archive"
              }
              id={`archive-${contact.id}`}
              onClick={(event) => handleToggleArchiveClick(event, contact)}
            />
            <Tooltip
              autoHide
              target={`#archive-${contact.id}`}
              position="top"
            />
          </>
        )}
      </div>

      {status && VALID_ACTIONS[status]?.includes("favorite") && (
        <div className="flex justify-between items-center opacity-100 w-[5%]">
          {favId === id && favLoading ? (
            <Loading size="small" />
          ) : (
            <i
              className={`pi pi-heart text-gray-400 group-hover:opacity-100 hover:text-pink-300 transition-opacity duration-300 ${
                favorites?.find((each) => each.contact_id === id)
                  ? "text-pink-600 opacity-50"
                  : "opacity-0"
              }`}
              data-pr-tooltip={
                favorites?.find((each) => each.contact_id === id)
                  ? "Unfavorite"
                  : "Favorite"
              }
              id={`favorite-${contact.id}`}
              onClick={(event) => handleFavoriteClick(event, id)}
            />
          )}
          <Tooltip autoHide target={`#favorite-${contact.id}`} position="top" />
        </div>
      )}
    </>
  );
};

export default ListActionButtons;
