import { useMemo, useState } from "react";
import "./App.css";
import ListContacts from "./components/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AppContext } from "./context/AppContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  const AppContextMemo = useMemo(
    () => ({ expanded, setExpanded, showAddContact, setShowAddContact }),
    [expanded, setExpanded, showAddContact, setShowAddContact]
  );

  return (
    <div className="flex bg-gray-100 border h-screen overflow-hidden">
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={AppContextMemo}>
          <Sidebar />
          <div className="relative flex flex-col flex-1 p-4 h-full overflow-x-hidden overflow-y-auto">
            <Header />
            <ListContacts />
          </div>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
