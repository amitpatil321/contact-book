import React from "react";
import ContactListDetails from "../components/ContactListDetails.layout";
import { CONTACT_STATUS } from "../constants/constants";

const Archived: React.FC = () => {
  return <ContactListDetails type={CONTACT_STATUS.archived} />;
};

export default Archived;
