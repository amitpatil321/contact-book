import { Route, Routes } from "react-router";
import App from "../App";
import Layout from "../components/Layout/Layout";
import { PAGES } from "../constants/constants";
import Archived from "../pages/Archived";
import Deleted from "../pages/Deleted";
import Favorites from "../pages/Favorites";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path={PAGES.favorites} element={<Favorites />} />
        <Route path={PAGES.archived} element={<Archived />} />
        <Route path={PAGES.deleted} element={<Deleted />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
