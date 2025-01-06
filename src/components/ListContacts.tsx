import React, { useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { motion } from "motion/react";

import { Contact } from "../types/types";
import supabase from "../constants/supabase";
import { TABLES } from "../constants/constants";
import Loading from "./Loading";
import { Tooltip } from "primereact/tooltip";

// type Contact = Database["public"]["Tables"]["contacts"]["Row"];

const ListContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from(TABLES.contacts)
        .select("*")
        .order("first_name");

      if (error) setError("Error fetching contacts:" + error);
      else setContacts(data as Contact[]);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  return (
    <div className="mt-3 rounded-lg w-full h-full">
      <div className="flex gap-4 w-full">
        <div className="bg-white pt-3 rounded-lg w-[100%] md:w-[50%] h-[calc(100vh-110px)] overflow-y-auto">
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
                  >
                    <div className="w-[20%] md:w-[15%] xl:w-[8%]">
                      <Avatar
                        image={profile_pic || ""}
                        label={first_name?.[0] || "U"}
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
                        className="bg-purple-500 text-gray-950"
                      />
                      <Tooltip target=".pi-trash" position="top" />
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="md:block hidden bg-white p-4 rounded-lg w-[50%] h-[calc(100vh-110px)]">
          Details
        </div>
      </div>
    </div>
  );
};

export default ListContacts;

{
  /* <div className="flex flex-col">
  <div className="">
    <Avatar
      label={first_name[0] || "U"}
      size="large"
      style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
      shape="circle"
    />{" "}
  </div>
  <div className="text-gray-500">{email}</div>
</div>; */
}
