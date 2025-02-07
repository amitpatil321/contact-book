import { motion } from "framer-motion";
import { Avatar } from "primereact/avatar";
import React from "react";

import { useSetSelectedContact } from "../../store/store";
import { Contact } from "../../types/types";
import ListActionButtons from "./ListActionButtons";

const ContactCard: React.FC<{ contact: Contact; selected?: boolean }> = ({
  contact,
  selected,
}) => {
  const { first_name, last_name, email, profile_pic } = contact;
  const setSelectedContact = useSetSelectedContact();

  return (
    <motion.div
      key={contact.id}
      className={`group align-top mx-4 flex flex-row  hover:bg-purple-100 mb-2 px-1 py-3 rounded-lg transition duration-500 cursor-pointer ${
        selected ? `bg-purple-100` : ``
      }`}
      onClick={() => setSelectedContact(contact)}
    >
      <div className="flex justify-center items-center w-[7%]">
        <Avatar
          image={profile_pic ?? ""}
          label={first_name?.[0] ?? "U"}
          size="large"
          shape="circle"
          style={{
            width: "48px",
            height: "36px",
            objectFit: "cover",
          }}
          className="align-bottom text-white small-pic"
        />
      </div>
      <div className="flex flex-col ml-2 w-[80%]">
        <div className="drop-shadow-sm">
          {first_name} {last_name}
        </div>
        <div className="align-top flex items-baseline text-gray-500 overflow-hidden">
          <span>{email}</span>
        </div>
      </div>
      <ListActionButtons key={contact.id} contact={contact} />
    </motion.div>
  );
};

export default React.memo(ContactCard);
