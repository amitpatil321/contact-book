import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";

type ResponseType = {
  recordId: string;
  action: string;
};

const toggleFavorites = async (contactId: string): Promise<ResponseType> => {
  const { data: existingData, error: fetchError } = await supabase
    .from(TABLES.favorites)
    .select("*")
    .eq("contact_id", contactId);

  if (fetchError) throw new Error(messages.favorites.errorFetching);

  if (existingData?.length) {
    const { data, error: deleteError } = await supabase
      .from(TABLES.favorites)
      .delete()
      .eq("contact_id", contactId)
      .select("id")
      .single();

    if (deleteError) throw new Error(messages.favorites.errorRemoving);

    return { recordId: data?.id.toString(), action: "unfavorited" };
  } else {
    const { data, error: insertError } = await supabase
      .from(TABLES.favorites)
      .insert({ contact_id: contactId })
      .select("id")
      .single();

    if (insertError) {
      throw new Error(messages.favorites.errorInserting);
    }

    return { recordId: data?.id.toString(), action: "favorited" };
  }
};

const useToggleFavorites = (): UseMutationResult<
  ResponseType,
  Error,
  string
> => {
  return useMutation<ResponseType, Error, string>({
    mutationFn: async (contactId) => await toggleFavorites(contactId),
  });
};

export default useToggleFavorites;
