import { useQuery } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import useStore from "../store/store";
import { Contact, Favorites } from "../types/types";

const fetchFavorites = async (): Promise<Favorites[]> => {
  const { data, error } = await supabase.from(TABLES.favorites).select("*");

  if (error) {
    throw new Error(messages.favorites.errorFetching);
  }

  return data as Favorites[];
};

const useFetchFavorites = () => {
  const { contacts } = useStore();

  return useQuery<Favorites[], Error, Contact[]>({
    queryKey: ["fetchFavorites"],
    queryFn: fetchFavorites,
    select: (favorites: Favorites[]): Contact[] => {
      return (
        contacts?.filter((contact: Contact) =>
          favorites.some((fav) => fav.contact_id === contact.id)
        ) ?? []
      );
    },
  });
};

export default useFetchFavorites;
