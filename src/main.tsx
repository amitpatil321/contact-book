import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastProvider } from "./context/ToastContext";

import App from "./App.tsx";
import "./index.css";

// import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
// import "primeflex/primeflex.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 1000 * 60, // 5 mins
      staleTime: 5 * 1000 * 60,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <PrimeReactProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ToastProvider>
    </PrimeReactProvider>
  </BrowserRouter>
  // </StrictMode>
);
