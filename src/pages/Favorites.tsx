import ContactListDetails from "../components/ContactListDetails.layout";
import { CONTACT_STATUS } from "../constants/constants";

const Favorites = () => {
  return <ContactListDetails type={CONTACT_STATUS.favorites} />;
};

export default Favorites;
