// import ContactListDetails from "../components/ContactListDetails.layout";
import { lazy } from "react";
import { CONTACT_STATUS } from "../constants/constants";

const ContactListDetails = lazy(
  () => import("../components/ContactListDetails.layout")
);

const Favorites = () => {
  return <ContactListDetails type={CONTACT_STATUS.favorites} />;
};

export default Favorites;
