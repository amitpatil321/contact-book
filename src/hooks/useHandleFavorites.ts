import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import messages from "../constants/messages";
import { useToast } from "../hooks/useToast";

type ToggleFavoritesOptions = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
};

const useHandleFavorites = (
  toggleFavorites: (favorites: string, options: ToggleFavoritesOptions) => void
) => {
  const [favId, setFavId] = useState<string>("");
  const queryClientObj = useQueryClient();
  const { showToast } = useToast();

  const handleFavorites = useCallback(
    (event: React.MouseEvent, id: string) => {
      setFavId(id);

      toggleFavorites(id, {
        onSuccess: () => {
          showToast("success", "Success", messages.favorites.addSuccess);
          queryClientObj.invalidateQueries({ queryKey: ["fetchFavorites"] });
        },
        onError: () => {
          showToast("error", "Error", messages.favorites.errorSaving);
        },
        onSettled: () => setFavId(""),
      });

      event.stopPropagation();
      event.preventDefault();
    },
    [toggleFavorites, showToast, queryClientObj]
  );

  return { handleFavorites, favId };
};

export default useHandleFavorites;
