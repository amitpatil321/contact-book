import { PrimeReactProvider } from "primereact/api";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { AppContextProvider } from "./providers/AppContextProvider.tsx";
import { QueryClientProvider } from "./providers/QueryClientProvider.tsx";
import { ToastContextProvider } from "./providers/ToastContextProvider.tsx";
import AppRoutes from "./routes/routes.tsx";

import App from "./App.tsx";
import "./index.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-purple/theme.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <PrimeReactProvider>
      <ToastContextProvider>
        <QueryClientProvider>
          <AppContextProvider>
            <AppRoutes />
            <App />
          </AppContextProvider>
        </QueryClientProvider>
      </ToastContextProvider>
    </PrimeReactProvider>
  </BrowserRouter>
  // </StrictMode>
);
