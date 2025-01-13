import { motion } from "motion/react";
import { Avatar } from "primereact/avatar";
import { Messages } from "primereact/messages";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useRef } from "react";

import useFetchContacts from "../api/useFetchContacts";
import useStore from "../store/store";
import Loading from "./Loading";

const Contacts = () => {
  const { data: contacts, error, isLoading: loading } = useFetchContacts();
  const msgs = useRef<Messages | null>(null);
  const { setSelectedContact } = useStore();

  useEffect(() => {
    if (error && msgs.current) {
      msgs.current.clear();
      msgs.current.show({
        sticky: true,
        severity: "error",
        summary: "Error",
        detail: error?.message,
        closable: false,
      });
    }
  }, [error]);

  return (
    <>
      <Messages ref={msgs} />
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {contacts?.map((contact) => {
            const { first_name, last_name, email, profile_pic } = contact;
            return (
              <motion.li
                key={contact.id}
                className="align-top flex flex-row bg-white hover:bg-purple-100 mx-3 mb-2 px-3 py-3 rounded-lg transition duration-500 cursor-pointer group"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="w-[20%] md:w-[15%] xl:w-[8%]">
                  <Avatar
                    image={profile_pic ?? ""}
                    label={first_name?.[0] ?? "U"}
                    size="large"
                    shape="circle"
                    className="align-bottom bg-purple-500 text-white"
                  />
                </div>
                <div className="flex flex-col w-[65%] md:w-[75%] xl:w-[85%]">
                  <div className="drop-shadow-sm">
                    {first_name} {last_name}
                  </div>
                  <div className="align-top flex items-baseline text-gray-500 overflow-hidden">
                    {/* <i className="mr-1 text-[12px] pi pi-envelope" /> */}
                    <span>{email}</span>
                  </div>
                </div>
                {/* <div className="flex justify-between items-start md:items-center opacity-0 group-hover:opacity-100 w-[10%] w-[15%] text-gray-400 transition-opacity duration-300"> */}
                <div className="flex justify-between items-start md:items-center opacity-0 group-hover:opacity-100 w-[15%] md:w-[10%] xl:w-[7%] text-gray-400 transition-opacity duration-300">
                  <i className="pi pi-pencil" data-pr-tooltip="Edit" />
                  <i className="pi pi-trash" data-pr-tooltip="Delete" />
                  <Tooltip
                    target=".pi-pencil"
                    position="top"
                    className="purple-tooltip"
                  />
                  <Tooltip target=".pi-trash" position="top" />
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Contacts;
