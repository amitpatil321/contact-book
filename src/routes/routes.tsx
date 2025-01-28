import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { PAGES } from "../constants/constants";

const Active = lazy(() => import("../pages/Active"));
const Archived = lazy(() => import("../pages/Archived"));
const Deleted = lazy(() => import("../pages/Deleted"));
const Favorites = lazy(() => import("../pages/Favorites"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loading size="medium" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Active type="active" />} />
          <Route path={PAGES.favorites} element={<Favorites />} />
          <Route path={PAGES.archived} element={<Archived type="archived" />} />
          <Route path={PAGES.deleted} element={<Deleted type="deleted" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
