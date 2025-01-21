import { Route, Routes } from "react-router";
import Layout from "../components/Layout/Layout";
import NotFound from "../components/NotFound";
import { PAGES } from "../constants/constants";
import Active from "../pages/Active";
import Archived from "../pages/Archived";
import Deleted from "../pages/Deleted";
import Favorites from "../pages/Favorites";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Active type="active" />} />
        <Route path={PAGES.favorites} element={<Favorites />} />
        <Route path={PAGES.archived} element={<Archived type="archived" />} />
        <Route path={PAGES.deleted} element={<Deleted type="deleted" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
