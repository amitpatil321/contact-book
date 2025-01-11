import React from "react";

import ContactDetails from "./ContactDetails";
import ListContacts from "./ListContacts";

const Dashboard: React.FC = () => {
  return (
    <div className="mt-3 rounded-lg w-full h-full">
      <div className="flex gap-4 w-full">
        <div className="bg-white p-4 pt-3 rounded-lg w-[100%] md:w-[50%] h-[calc(100vh-110px)] overflow-y-auto">
          <ListContacts />
        </div>
        <div className="md:block hidden bg-white p-4 rounded-lg w-[50%] h-[calc(100vh-110px)]">
          <ContactDetails />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
