import ContactListDetails from "../components/ContactListDetails.layout";
import { ContactStatusTypes } from "../types/types";

const Deleted: React.FC<{ type: ContactStatusTypes }> = ({ type }) => {
  return <ContactListDetails type={type} />;
};

export default Deleted;
