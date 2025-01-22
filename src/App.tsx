import React from "react";
import { useLocation } from "react-router";
import "./App.css";
import AppRoutes from "./routes/routes";
import useStore from "./store/store";

function App() {
  const { setSelectedContact } = useStore();
  const location = useLocation();
  React.useEffect(() => {
    setSelectedContact(null);
  }, [location, setSelectedContact]);

  return <AppRoutes />;
}

export default App;
