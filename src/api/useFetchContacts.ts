import { useQuery } from "@tanstack/react-query";
import { CONTACT_STATUS, TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact, ContactStatusTypes } from "../types/types";

const fetchContacts = async (
  type: ContactStatusTypes,
  favContactList?: { id: string; user_id: string }[]
): Promise<Contact[]> => {
  let query = supabase.from(TABLES.contacts).select("*").order("first_name");

  if (
    type === CONTACT_STATUS.favorites &&
    favContactList &&
    favContactList.length > 0
  ) {
    const contactIds = favContactList.map((contact) => contact.user_id);
    console.log(contactIds);
    query = query.eq("status", CONTACT_STATUS.active).in("id", contactIds);
  } else {
    query = query.eq("status", type);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(messages.contacts.errorFetching);
  }

  return data as Contact[];
};

const useFetchContacts = (
  type: ContactStatusTypes,
  favContacts?: { id: string; user_id: string }[]
) => {
  return useQuery<Contact[]>({
    queryKey: ["fetchContacts", type, favContacts],
    queryFn: () => fetchContacts(type, favContacts),
    enabled:
      type !== CONTACT_STATUS.favorites ||
      (favContacts && favContacts.length > 0),
  });
};

export default useFetchContacts;
