import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { ConfirmPopup } from "primereact/confirmpopup";
import { Outlet } from "react-router";
import "../../App.css";

function Layout() {
  return (
    <div className="flex bg-gray-100 border h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 p-4 h-full overflow-x-hidden overflow-y-auto">
        <Header />
        <div className="mt-4">
          <Outlet />
          <ConfirmPopup />
        </div>
      </div>
    </div>
  );
}

export default Layout;
