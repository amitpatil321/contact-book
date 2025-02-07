import React, { Suspense } from "react";

import Loading from "../components/Loading";
import { CONTACT_STATUS } from "../constants/constants";
import { useShowAddContactForm } from "../store/store";
import { ContactStatusTypes } from "../types/types";
import ListFavorites from "./ListFavorites/ListFavorites";

const ListContacts = React.lazy(() => import("./ListContacts/ListContacts"));
const ContactDetails = React.lazy(
  () => import("../components/ContactDetails/ContactDetails")
);
const AddContact = React.lazy(
  () => import("../components/AddContact/AddContact")
);

const ContactListDetails: React.FC<{ type: ContactStatusTypes }> = ({
  type,
}) => {
  const showAddContactForm = useShowAddContactForm();

  return (
    <div className="flex gap-4 w-full">
      <div className="bg-white pt-4 rounded-lg w-[100%] md:w-[50%] h-[calc(100vh-110px)]">
        <Suspense fallback={<Loading size="medium" className="mt-4" />}>
          {type === CONTACT_STATUS.favorites ? (
            <ListFavorites />
          ) : (
            <ListContacts type={type} />
          )}
        </Suspense>
      </div>
      <div className="md:block hidden bg-white p-4 rounded-lg w-[50%] h-[calc(100vh-110px)]">
        {showAddContactForm ? (
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

export default ContactListDetails;
