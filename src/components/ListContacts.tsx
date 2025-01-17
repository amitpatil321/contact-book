import { motion } from "motion/react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { Tooltip } from "primereact/tooltip";
import { useContext, useEffect, useRef } from "react";

import useFetchContacts from "../api/useFetchContacts";
import { AppContext } from "../context/AppContext";
import useStore from "../store/store";
import { AppContextType } from "../types/types";
import Loading from "./Loading";
import Empty from "./NoContactSelected";

const Contacts = () => {
  const { data: contacts, error, isLoading: loading } = useFetchContacts();
  const msgs = useRef<Messages | null>(null);
  const { setSelectedContact } = useStore();
  const {
    setShowAddContact,
    favoritesArr,
    favId,
    favLoading,
    handleFavorites,
  } = useContext(AppContext) as AppContextType;

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

  if (!loading && !contacts?.length && !error)
    return (
      <Empty
        message={
          <div className="flex flex-col items-center">
            <span>No conatcts, Lets create one</span>
            <Button
              icon="pi pi-plus"
              label="Add Contact"
              aria-label="Add contact"
              severity="help"
              size="small"
              text
              onClick={() => setShowAddContact(true)}
            />
          </div>
        }
      />
    );

  return (
    <>
      <Messages ref={msgs} />
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {contacts?.map((contact) => {
            const { id, first_name, last_name, email, profile_pic } = contact;
            return (
              <motion.li
                key={contact.id}
                className="align-top flex flex-row bg-white hover:bg-purple-100 mb-2 px-3 py-3 rounded-lg transition duration-500 cursor-pointer group"
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
                <div className="flex flex-col w-[65%] md:w-[75%] xl:w-[82%]">
                  <div className="drop-shadow-sm">
                    {first_name} {last_name}
                  </div>
                  <div className="align-top flex items-baseline text-gray-500 overflow-hidden">
                    <span>{email}</span>
                  </div>
                </div>
                <div className="flex justify-evenly items-start md:items-center opacity-0 group-hover:opacity-100 w-[15%] md:w-[10%] xl:w-[10%] text-gray-400 transition-opacity duration-300">
                  <i className="pi pi-pencil" data-pr-tooltip="Edit" />
                  <i className="pi pi-trash" data-pr-tooltip="Delete" />
                  <Tooltip
                    autoHide
                    target=".pi-pencil"
                    position="top"
                    className="purple-tooltip"
                  />
                  <Tooltip autoHide target=".pi-trash" position="top" />
                </div>
                <div
                  className={`flex justify-between items-center w-[5%] ${favoritesArr?.includes(
                    id
                  )} ? "opacity-100" : "opacity-0`}
                >
                  {favId === id && favLoading ? (
                    <Loading size="small" />
                  ) : (
                    <i
                      className={`pi pi-heart text-gray-400 group-hover:opacity-100 transition-opacity duration-300 ${
                        favoritesArr?.includes(id)
                          ? `text-pink-600 opacity-50`
                          : "opacity-0"
                      }`}
                      data-pr-tooltip={
                        favoritesArr?.includes(id) ? "Unfavorite" : "Favorite"
                      }
                      onClick={(event) => handleFavorites(event, id)}
                    />
                  )}
                  <Tooltip autoHide target=".pi-heart" position="top" />
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
