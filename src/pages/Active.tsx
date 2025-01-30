import React from "react";
import ContactListDetails from "../components/ContactListDetails.layout";
import { CONTACT_STATUS } from "../constants/constants";

const Active: React.FC = () => {
  return <ContactListDetails type={CONTACT_STATUS.active} />;
};

export default Active;
