import { Button } from "primereact/button";
import { useCallback, useContext } from "react";
import useToggleArchieve from "../../api/useToggleArchieve";
import { AppContext } from "../../context/AppContext";
import useHandleArchieve from "../../hooks/useHandleArchieve";
import { AppContextType, Contact } from "../../types/types";
import Loading from "../Loading";

interface ActionButtonProps {
  contact: Contact;
}

const ActionButton: React.FC<ActionButtonProps> = ({ contact }) => {
  const { favoritesArr, favLoading, handleFavorites } = useContext(
    AppContext
  ) as AppContextType;

  const { mutate: toggleArchieve } = useToggleArchieve();
  const { archieveLoading, handleArchieve } = useHandleArchieve(toggleArchieve);

  const handleFavoriteClick = useCallback(
    (event: React.MouseEvent) => handleFavorites(event, contact.id),
    [handleFavorites, contact.id]
  );

  const handleToggleArchieveClick = useCallback(() => {
    handleArchieve(contact);
  }, [handleArchieve, contact]);

  return (
    <div className="flex justify-start items-center gap-2 mt-auto text-gray-400 text-sm">
      <span
        className={`hover:text-pink-700 cursor-pointer ${
          favLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={handleFavoriteClick}
      >
        {favoritesArr?.includes(contact.id) ? "Unfavorite" : "Favorite"}
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
      <span className="text-gray-400">|</span>
      <Button
        link
        className="px-1 text-gray-400 hover:text-red-500 cursor-pointer"
        onClick={() => console.log(contact.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionButton;
