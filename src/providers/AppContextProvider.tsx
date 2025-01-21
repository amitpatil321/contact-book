import { ReactNode, useMemo, useState } from "react";
import useFetchFavorites from "../api/useFetchFavorite";
import useToggleFavorites from "../api/useToggleFavorite";
import { AppContext } from "../context/AppContext";
import useHandleFavorites from "../hooks/useHandleFavorites";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: favData } = useFetchFavorites();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const favoritesArr = useMemo(
    () => (favData ? favData[0]?.favorites?.split(",") : []),
    [favData]
  );

  const { mutate: toggleFavorites, isPending: favLoading } =
    useToggleFavorites();

  const { handleFavorites, favId } = useHandleFavorites(
    favoritesArr,
    toggleFavorites
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
      handleFavorites,
    }),
    [
      expanded,
      setExpanded,
      showAddContact,
      setShowAddContact,
      favoritesArr,
      favId,
      favLoading,
      handleFavorites,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
