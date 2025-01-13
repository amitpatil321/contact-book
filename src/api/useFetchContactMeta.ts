import { useQuery } from '@tanstack/react-query';
import supabase from '../constants/supabase';
import { Meta } from "../types/types";

const fetchUserMeta = async (contactId: number): Promise<Meta[]> => {
  const { data, error } = await supabase
    .from('meta')
    .select('*')
    .eq('user_id', contactId);

  if (error) throw new Error(error.message);

    console.log(data);

  return data as Meta[];
};

const useFetchContactMeta = (contactId: number | undefined) => {
  return useQuery({
    queryKey: ["userMeta", contactId],
     queryFn: () => {
      if (contactId === undefined) {
        throw new Error("Contact ID is undefined");
      }
      return fetchUserMeta(contactId);
    },
    enabled: !!contactId,
  });
};

export default useFetchContactMeta