import React, { Suspense, useMemo, useState } from "react";

import useFetchFavorites from "./api/useFetchFavorite";
import useToggleFavorites from "./api/useToggleFavorite";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AppContext } from "./context/AppContext";
import useHandleFavorites from "./hooks/useHandleFavorites";

const ListContacts = React.lazy(() => import("./components/Dashboard"));

import "./App.css";
import Loading from "./components/Loading";

function App() {
  const { data: favData } = useFetchFavorites();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const favoritesArr = favData ? favData[0]?.favorites?.split(",") : null;

  const { mutate: toggleFavorites, isPending: favLoading } =
    useToggleFavorites();

  const { handleFavorites, favId } = useHandleFavorites(
    favoritesArr,
    toggleFavorites
  );

  const AppContextMemo = useMemo(
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
    <div className="flex bg-gray-100 border h-screen overflow-hidden">
      <AppContext.Provider value={AppContextMemo}>
        <Sidebar />
        <div className="relative flex flex-col flex-1 p-4 h-full overflow-x-hidden overflow-y-auto">
          <Header />
          <Suspense fallback={<Loading className="mt-6" size="small" />}>
            <ListContacts />
          </Suspense>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
