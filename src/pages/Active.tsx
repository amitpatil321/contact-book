import React, { lazy } from "react";
import { CONTACT_STATUS } from "../constants/constants";
// import ContactListDetails from "../components/ContactListDetails.layout";

const ContactListDetails = lazy(
  () => import("../components/ContactListDetails.layout")
);

const Active: React.FC = () => {
  return <ContactListDetails type={CONTACT_STATUS.active} />;
};

export default Active;
