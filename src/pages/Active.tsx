import React from "react";
import ContactListDetails from "../components/ContactListDetails.layout";
import { ContactStatusTypes } from "../types/types";

const Active: React.FC<{ type: ContactStatusTypes }> = ({ type }) => {
  return <ContactListDetails type={type} />;
};

export default Active;
