// import ContactListDetails from "../components/ContactListDetails.layout";
import { lazy } from "react";
import { CONTACT_STATUS } from "../constants/constants";

const ContactListDetails = lazy(
  () => import("../components/ContactListDetails.layout")
);

const Deleted: React.FC = () => {
  return <ContactListDetails type={CONTACT_STATUS.deleted} />;
};

export default Deleted;
