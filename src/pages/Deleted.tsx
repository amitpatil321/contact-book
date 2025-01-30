import ContactListDetails from "../components/ContactListDetails.layout";
import { CONTACT_STATUS } from "../constants/constants";

const Deleted: React.FC = () => {
  return <ContactListDetails type={CONTACT_STATUS.deleted} />;
};

export default Deleted;
