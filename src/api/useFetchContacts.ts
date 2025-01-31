import { useQuery } from "@tanstack/react-query";
import { CONTACT_STATUS, TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import useStore from "../store/store";
import { Contact, ContactStatusTypes } from "../types/types";

const fetchContacts = async (
  type: ContactStatusTypes,
  favContactList?: { id: string; contact_id: string }[]
): Promise<Contact[]> => {
  let query = supabase.from(TABLES.contacts).select("*").order("first_name");

  if (
    type === CONTACT_STATUS.favorites &&
    favContactList &&
    favContactList.length > 0
  ) {
    const contactIds = favContactList.map((contact) => contact.contact_id);
    query = query.eq("status", CONTACT_STATUS.active).in("id", contactIds);
  } else {
    query = query.eq("status", type);
  }

  const { data, error } = await query;

  if (error) throw new Error(messages.contacts.errorFetching);

  return data as Contact[];
};

const useFetchContacts = (
  type: ContactStatusTypes,
  favContacts?: { id: string; contact_id: string }[]
) => {
  const { favorites, contacts } = useStore();
  const contactResponse = useQuery<Contact[]>({
    queryKey: ["fetchContacts", type],
    queryFn: () => fetchContacts(type),
    enabled:
      type !== CONTACT_STATUS.favorites ||
      (favContacts && favContacts.length > 0),
  });

  if (type === CONTACT_STATUS.favorites) {
    return {
      data: (contacts ?? []).filter((contact) =>
        (favorites ?? []).some((favorite) => favorite.contact_id === contact.id)
      ),
      error: null,
      isLoading: false,
    };
  }

  return contactResponse;
};

export default useFetchContacts;
