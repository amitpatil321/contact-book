import { useContext } from "react";
import NoData from "../components/NoData";
import messages from "../constants/messages";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types/types";

const Favorites = () => {
  const { favoritesArr } = useContext(AppContext) as AppContextType;

  if (!favoritesArr?.length)
    return <NoData message={messages.contacts.noContacts} />;

  return <div>Favorites</div>;
};

export default Favorites;
