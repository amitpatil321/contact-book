import { useQuery } from "@tanstack/react-query";
import { CONTACT_STATUS, TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact, ContactStatusTypes } from "../types/types";

const fetchContacts = async (type: ContactStatusTypes): Promise<Contact[]> => {
  const query = supabase
    .from(TABLES.contacts)
    .select("*")
    .eq("status", CONTACT_STATUS[type])
    .order("first_name");

  const { data, error } = await query;

  if (error) throw new Error(messages.contacts.errorFetching);

  return data as Contact[];
};

const useFetchContacts = (type: ContactStatusTypes) => {
  const contactResponse = useQuery<Contact[]>({
    queryKey: ["fetchContacts", type],
    queryFn: () => fetchContacts(type),
  });

  return contactResponse;
};

export default useFetchContacts;
