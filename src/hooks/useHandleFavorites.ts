import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useToast } from "../hooks/useToast";

type ToggleFavoritesOptions = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
};

const useHandleFavorites = (
  favoritesArr: string[] | null | undefined,
  toggleFavorites: (favorites: string, options: ToggleFavoritesOptions) => void
) => {
  const [favId, setFavId] = useState<string | null>(null);
  const queryClientObj = useQueryClient();
  const { showToast } = useToast();

  const handleFavorites = useCallback(
    (event: React.MouseEvent, id: string) => {
      setFavId(id);

      // if id exists then remove, otherwise add
      const filtered = favoritesArr?.includes(id)
        ? favoritesArr?.filter((each) => each !== id)
        : [...(favoritesArr || []), id];

      toggleFavorites(filtered.join(","), {
        onSuccess: () => {
          showToast("success", "Success", "Favorites saved successfully!");
          queryClientObj.invalidateQueries({ queryKey: ["fetchFavorites"] });
        },
        onError: () => {
          showToast("error", "Error", "Error saving favorites");
        },
        onSettled: () => setFavId(null),
      });

      event.stopPropagation();
      event.preventDefault();
    },
    [favoritesArr, toggleFavorites, showToast, queryClientObj]
  );

  return { handleFavorites, favId };
};

export default useHandleFavorites;
