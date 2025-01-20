import { useQuery } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact, ContactStatusTypes } from "../types/types";

const fetchContacts = async (type: ContactStatusTypes): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from(TABLES.contacts)
    .select("*")
    .eq("status", type)
    .order("first_name");

  if (error) {
    throw new Error(messages.contacts.errorFetching);
  }

  return data as Contact[];
};

const useFetchContacts = (type: ContactStatusTypes) => {
  return useQuery<Contact[]>({
    queryKey: ["fetchContacts", type],
    queryFn: () => fetchContacts(type),
  });
};

export default useFetchContacts;
