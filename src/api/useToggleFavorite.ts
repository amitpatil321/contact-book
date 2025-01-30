import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Favorites } from "../types/types";

const toggleFavorites = async (
  contactId: string
): Promise<Favorites | null> => {
  const { data: existingData, error: fetchError } = await supabase
    .from(TABLES.favorites)
    .select("*")
    .eq("user_id", contactId);

  if (fetchError) throw new Error(messages.favorites.errorFetching);

  if (existingData?.length) {
    const { error: deleteError } = await supabase
      .from(TABLES.favorites)
      .delete()
      .eq("user_id", contactId);

    if (deleteError) throw new Error(messages.favorites.errorRemoving);

    return null;
  } else {
    const { data, error: insertError } = await supabase
      .from(TABLES.favorites)
      .insert({ user_id: contactId })
      .single();

    if (insertError) {
      throw new Error(messages.favorites.errorInserting);
    }

    return data as Favorites;
  }
};

const useToggleFavorites = (): UseMutationResult<
  Favorites | null,
  Error,
  string
> => {
  return useMutation<Favorites | null, Error, string>({
    mutationFn: async (contactId) => await toggleFavorites(contactId),
  });
};

export default useToggleFavorites;
