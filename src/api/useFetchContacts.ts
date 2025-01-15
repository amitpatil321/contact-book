import { useQuery } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import supabase from "../constants/supabase";
import { Contact } from "../types/types";

const fetchContacts = async (): Promise<Contact[]> => {
    const { data, error } = await supabase
    .from(TABLES.contacts)
    .select("*")
    .order("first_name");

  if (error) {
    throw new Error(error.message);
  }

  return data as Contact[];
};

const useFetchContacts = () => {
  return useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: fetchContacts
  });
};

export default useFetchContacts;
