import { useQuery } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Favorites } from "../types/types";

const fetchFavorites = async (): Promise<Favorites[]> => {
  const { data, error } = await supabase.from(TABLES.favorites).select("*");

  if (error) {
    throw new Error(messages.favorites.errorFetching);
  }

  return data as Favorites[];
};

const useFetchFavorites = () => {
  return useQuery<Favorites[]>({
    queryKey: ["fetchFavorites"],
    queryFn: fetchFavorites,
  });
};

export default useFetchFavorites;
