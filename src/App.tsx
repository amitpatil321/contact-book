import { useMemo, useState } from "react";
import "./App.css";
import ListContacts from "./components/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AppContext } from "./context/AppContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./context/ToastContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 1000 * 60, // 5 mins
      staleTime: 5 * 1000 * 60,
      retry: false,
    },
  },
});

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
          <ToastProvider>
            <Sidebar />
            <div className="relative flex flex-col flex-1 p-4 h-full overflow-x-hidden overflow-y-auto">
              <Header />
              <ListContacts />
            </div>
          </ToastProvider>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
