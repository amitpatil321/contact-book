import { motion } from "motion/react";
import { Avatar } from "primereact/avatar";
import { Messages } from "primereact/messages";
import { Tooltip } from "primereact/tooltip";
import { useContext, useEffect, useRef } from "react";

import { Button } from "primereact/button";
import { useLocation } from "react-router";
import useFetchContacts from "../api/useFetchContacts";
import { PAGES } from "../constants/constants";
import messages from "../constants/messages";
import { AppContext } from "../context/AppContext";
import useStore from "../store/store";
import { AppContextType, ContactStatusTypes } from "../types/types";
import Loading from "./Loading";
import NoData from "./NoData";

const Contacts: React.FC<{ type: ContactStatusTypes }> = ({ type }) => {
  const { data: contacts, error, isLoading: loading } = useFetchContacts(type);
  const msgs = useRef<Messages | null>(null);
  const { setSelectedContact } = useStore();
  const {
    setShowAddContact,
    favoritesArr,
    favId,
    favLoading,
    handleFavoriteClick,
    handleDeleteClick,
  } = useContext(AppContext) as AppContextType;

  const location = useLocation();

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
      <NoData
        message={messages.contacts.noContacts}
        actionComponent={
          <Button
            icon="pi pi-plus"
            label="Add Contact"
            aria-label="Add contact"
            severity="help"
            size="small"
            text
            onClick={() => setShowAddContact(true)}
          />
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
                <div className="w-[7%]">
                  <Avatar
                    image={profile_pic ?? ""}
                    label={first_name?.[0] ?? "U"}
                    size="large"
                    shape="circle"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                    className="align-bottom bg-purple-500 text-white"
                  />
                </div>
                <div className="flex flex-col w-[80%]">
                  <div className="drop-shadow-sm">
                    {first_name} {last_name}
                  </div>
                  <div className="align-top flex items-baseline text-gray-500 overflow-hidden">
                    <span>{email}</span>
                  </div>
                </div>
                <div className="flex justify-evenly items-start md:items-center opacity-0 group-hover:opacity-100 w-[13%] text-gray-400 transition-opacity duration-300">
                  {![PAGES.deleted].includes(location.pathname) ? (
                    <i className="pi pi-pencil" data-pr-tooltip="Edit" />
                  ) : null}
                  <i
                    className={`pi pi-trash hover:text-red-300 `}
                    data-pr-tooltip={`${
                      contact.status === "deleted" ? "Restore" : "Delete"
                    }`}
                    onClick={(event) => {
                      handleDeleteClick(event, contact);
                    }}
                  />
                  {![PAGES.deleted].includes(location.pathname) ? (
                    <i
                      className="pi pi-box"
                      data-pr-tooltip={
                        contact.status === "archived" ? "UnArchive" : "Archive"
                      }
                    />
                  ) : null}
                  <Tooltip
                    autoHide
                    target=".pi-pencil"
                    position="top"
                    className="purple-tooltip"
                  />
                  <Tooltip autoHide target=".pi-trash" position="top" />
                  <Tooltip autoHide target=".pi-box" position="top" />
                </div>
                {[PAGES.dashboard, PAGES.favorites].includes(
                  location.pathname
                ) ? (
                  <div
                    className={`flex justify-between items-center w-[5%] ${favoritesArr?.includes(
                      id
                    )} ? "opacity-100" : "opacity-0`}
                  >
                    {favId === id && favLoading ? (
                      <Loading size="small" />
                    ) : (
                      <i
                        className={`pi pi-heart text-gray-400 group-hover:opacity-100 hover:text-pink-300 transition-opacity duration-300 ${
                          favoritesArr?.includes(id)
                            ? `text-pink-600 opacity-50`
                            : "opacity-0"
                        }`}
                        data-pr-tooltip={
                          favoritesArr?.includes(id) ? "Unfavorite" : "Favorite"
                        }
                        onClick={(event) => handleFavoriteClick(event, id)}
                      />
                    )}
                    <Tooltip autoHide target=".pi-heart" position="top" />
                  </div>
                ) : null}
              </motion.li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Contacts;
