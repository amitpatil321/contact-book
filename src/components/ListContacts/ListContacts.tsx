import { Messages } from "primereact/messages";
import React, { useContext, useEffect, useRef } from "react";

import { Button } from "primereact/button";
import useFetchContacts from "../../api/useFetchContacts";
import messages from "../../constants/messages";
import { AppContext } from "../../context/AppContext";
import useStore, { useSelectedContact } from "../../store/store";
import { AppContextType, ContactStatusTypes } from "../../types/types";
import Loading from "../Loading";
import NoData from "../NoData";
import ContactCard from "./ContactCard";

const Contacts: React.FC<{ type: ContactStatusTypes }> = ({ type }) => {
  const { contacts, setContacts } = useStore();
  const selected = useSelectedContact();

  const { setShowAddContact } = useContext(AppContext) as AppContextType;

  const {
    data: fetchedContacts,
    error,
    isLoading: loading,
  } = useFetchContacts(type);

  const msgs = useRef<Messages | null>(null);

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

  useEffect(() => {
    if (fetchedContacts) setContacts(fetchedContacts);
  }, [fetchedContacts, setContacts, type]);

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
        <Loading size={"medium"} />
      ) : (
        <ul>
          {contacts?.map((contact) => {
            return (
              <ContactCard
                selected={selected?.id === contact.id}
                key={contact.id}
                contact={contact}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default React.memo(Contacts);
