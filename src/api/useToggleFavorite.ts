import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import supabase from "../constants/supabase";
import { Favorites } from "../types/types";

const toggleFavorites = async (favArr: string): Promise<Favorites> => {
  // Check if the favorites record exists
  const { data, error } = await supabase.from(TABLES.favorites).select("*");

  if (error) {
    throw new Error("Failed to fetch favorites");
  }

  if (data.length === 0) {
    // If no record is found, insert a new record
    const { data: insertedData, error: insertError } = await supabase
      .from(TABLES.favorites)
      .insert([{ favorites: favArr }])
      .single();

    if (insertError) {
      throw new Error("Failed to insert new favorites");
    }

    return insertedData as Favorites;
  }

  // If record is found, update it
  const { data: updatedData, error: updateError } = await supabase
    .from(TABLES.favorites)
    .update({ favorites: favArr })
    .eq("id", data?.[0]?.id)
    .single();

  if (updateError) {
    throw new Error("Failed to update favorites");
  }

  return updatedData as Favorites;
};

const useToggleFavorites = (): UseMutationResult<Favorites, Error, string> => {
  return useMutation<Favorites, Error, string>({
    mutationFn: async (favIds) => await toggleFavorites(favIds),
  });
};

export default useToggleFavorites;
