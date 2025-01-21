import React from "react";
import ContactListDetails from "../components/ContactListDetails.layout";
import { ContactStatusTypes } from "../types/types";

const Archived: React.FC<{ type: ContactStatusTypes }> = ({ type }) => {
  return <ContactListDetails type={type} />;
};

export default Archived;
