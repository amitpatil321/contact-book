import { useQuery } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Meta } from "../types/types";

const fetchUserMeta = async (contactId: string): Promise<Meta[]> => {
  const { data, error } = await supabase
    .from(TABLES.meta)
    .select("*")
    .eq("contact_id", contactId);

  if (error) throw new Error(error.message);

  return data as Meta[];
};

const useFetchContactMeta = (contactId: string | undefined) => {
  return useQuery({
    queryKey: ["userMeta", contactId],
    queryFn: () => {
      if (contactId === undefined) {
        throw new Error(messages.contacts.missingId);
      }
      return fetchUserMeta(contactId);
    },
    enabled: !!contactId,
  });
};

export default useFetchContactMeta;
