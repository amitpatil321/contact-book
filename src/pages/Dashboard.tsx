import React, { Suspense, useContext } from "react";

import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types/types";

const ListContacts = React.lazy(() => import("../components/ListContacts"));
const ContactDetails = React.lazy(
  () => import("../components/ContactDetails/ContactDetails")
);
const AddContact = React.lazy(
  () => import("../components/AddContact/AddContact")
);

const Dashboard: React.FC = () => {
  const { showAddContact } = useContext(AppContext) as AppContextType;
  return (
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
  );
};

export default Dashboard;
