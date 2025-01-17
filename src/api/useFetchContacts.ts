import { useQuery } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

const fetchContacts = async (): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from(TABLES.contacts)
    .select("*")
    .eq("status", "active")
    .order("first_name");

  if (error) {
    throw new Error(messages.contacts.errorFetching);
  }

  return data as Contact[];
};

const useFetchContacts = () => {
  return useQuery<Contact[]>({
    queryKey: ["fetchContacts"],
    queryFn: fetchContacts,
  });
};

export default useFetchContacts;
