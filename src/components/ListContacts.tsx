import { motion } from "motion/react";
import { Avatar } from "primereact/avatar";
import { Messages } from "primereact/messages";
import { Tooltip } from "primereact/tooltip";
import { useContext, useEffect, useRef } from "react";

import { Button } from "primereact/button";
import useFetchContacts from "../api/useFetchContacts";
import { VALID_ACTIONS } from "../constants/constants";
import messages from "../constants/messages";
import { AppContext } from "../context/AppContext";
import useStore from "../store/store";
import {
  AppContextType,
  Contact,
  ContactActionTypes,
  ContactStatusTypes,
} from "../types/types";
import Loading from "./Loading";
import NoData from "./NoData";

const Contacts: React.FC<{ type: ContactStatusTypes }> = ({ type }) => {
  const { data: contacts, error, isLoading: loading } = useFetchContacts(type);
  const msgs = useRef<Messages | null>(null);
  const { setSelectedContact } = useStore();
  const { setShowAddContact } = useContext(AppContext) as AppContextType;

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
            const { first_name, last_name, email, profile_pic } = contact;
            return (
              <motion.li
                key={contact.id}
                className="group align-top flex flex-row bg-white hover:bg-purple-100 mb-2 px-3 py-3 rounded-lg transition duration-500 cursor-pointer"
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
                      height: "36px",
                      objectFit: "cover",
                    }}
                    className="align-bottom text-white small-pic"
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
                <ActionButtons contact={contact} />
              </motion.li>
            );
          })}
        </ul>
      )}
    </>
  );
};

const ActionButtons: React.FC<{ contact: Contact }> = ({ contact }) => {
  const {
    favoritesArr,
    favId,
    favLoading,
    handleToggleArchiveClick,
    handleFavoriteClick,
    handleDeleteClick,
  } = useContext(AppContext) as AppContextType;
  const { id } = contact;

  const status = contact.status as ContactActionTypes | null;

  return (
    <>
      <div className="flex justify-evenly items-start md:items-center opacity-0 group-hover:opacity-100 w-[13%] text-gray-400 transition-opacity duration-300">
        {/* {location.pathname !== PAGES.deleted && (
          <i className="pi pi-pencil" data-pr-tooltip="Edit" />
        )} */}
        {status && VALID_ACTIONS[status]?.includes("edit") && (
          <>
            <i className="pi pi-pencil" data-pr-tooltip="Edit" />
            <Tooltip
              autoHide
              target=".pi-pencil"
              position="top"
              className="purple-tooltip"
            />
          </>
        )}
        {status && VALID_ACTIONS[status]?.includes("delete") && (
          <>
            <i
              className="hover:text-red-300 pi pi-trash"
              data-pr-tooltip={
                contact.status === "deleted" ? "Restore" : "Delete"
              }
              onClick={(event) => handleDeleteClick(event, contact)}
            />
            <Tooltip autoHide target=".pi-trash" position="top" />
          </>
        )}
        {/* {location.pathname !== PAGES.deleted && ( */}
        {status && VALID_ACTIONS[status]?.includes("archive") && (
          <>
            <i
              className="pi pi-box"
              data-pr-tooltip={
                contact.status === "archived" ? "UnArchive" : "Archive"
              }
              onClick={(event) => handleToggleArchiveClick(event, contact)}
            />
            <Tooltip autoHide target=".pi-box" position="top" />
          </>
        )}
      </div>

      {/* {[PAGES.dashboard, PAGES.favorites].includes(location.pathname) && ( */}
      {status && VALID_ACTIONS[status]?.includes("favorite") && (
        <div className={`flex justify-between items-center w-[5%] opacity-100`}>
          {favId === id && favLoading ? (
            <Loading size="small" />
          ) : (
            <i
              className={`pi pi-heart text-gray-400 group-hover:opacity-100 hover:text-pink-300 transition-opacity duration-300 ${
                favoritesArr?.includes(id)
                  ? "text-pink-600 opacity-50"
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
      )}
    </>
  );
};

export default Contacts;
