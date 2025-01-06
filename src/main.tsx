import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/bootstrap4-light-purple/theme.css"; // This imports theme.css from primereact themes module
import "primereact/resources/primereact.min.css"; // This imports primereact main css
import "primeicons/primeicons.css"; // This imports primeicons css from primeicons module
// import "primeflex/primeflex.css"; // This imports primeflex css from primeflex module

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
