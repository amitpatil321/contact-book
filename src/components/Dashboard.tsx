import React, { Suspense, useContext } from "react";

import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types/types";
// import ListContacts from "./ListContacts";
import Loading from "./Loading";

const ListContacts = React.lazy(() => import("./ListContacts"));
const ContactDetails = React.lazy(
  () => import("./ContactDetails/ContactDetails")
);
const AddContact = React.lazy(() => import("./AddContact/AddContact"));

const Dashboard: React.FC = () => {
  const { showAddContact } = useContext(AppContext) as AppContextType;
  return (
    <div className="mt-3 rounded-lg w-full h-full">
      <div className="flex gap-4 w-full">
        <div className="bg-white p-4 pt-3 rounded-lg w-[100%] md:w-[50%] h-[calc(100vh-110px)] overflow-y-auto">
          <Suspense fallback={<Loading size="small" />}>
            <ListContacts />
          </Suspense>
        </div>
        <div className="md:block hidden bg-white p-4 rounded-lg w-[50%] h-[calc(100vh-110px)]">
          {showAddContact ? (
            <Suspense fallback={<Loading size="small" />}>
              <AddContact />
            </Suspense>
          ) : (
            <Suspense fallback={<Loading size="small" />}>
              <ContactDetails />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
