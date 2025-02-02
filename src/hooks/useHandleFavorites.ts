import { useCallback, useState } from "react";
import messages from "../constants/messages";
import { useToast } from "../hooks/useToast";
import useStore from "../store/store";

type ResponseType = {
  recordId: string;
  action: string;
};

type ToggleFavoritesOptions = {
  onSuccess?: (response: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
};

const useHandleFavorites = (
  toggleFavorites: (favorites: string, options: ToggleFavoritesOptions) => void
) => {
  const [favId, setFavId] = useState<string>("");
  // const queryClientObj = useQueryClient();
  const { showToast } = useToast();
  const { favorites, setFavorites } = useStore();

  const handleFavorites = useCallback(
    (event: React.MouseEvent, contactId: string) => {
      setFavId(contactId);

      toggleFavorites(contactId, {
        onSuccess: (response) => {
          // Update favorites list in store
          if (response.action === "favorited") {
            showToast("success", "Success", messages.favorites.addSuccess);
            setFavorites([
              ...(favorites ?? []),
              { id: response.recordId, contact_id: contactId },
            ]);
          } else {
            console.log("removed:");
            showToast("success", "Success", messages.favorites.removeSuccess);
            setFavorites(
              (favorites ?? []).filter((each) => each.id !== response.recordId)
            );
          }
          // queryClientObj.invalidateQueries({ queryKey: ["fetchFavorites"] });
        },
        onError: () =>
          showToast("error", "Error", messages.favorites.errorSaving),
        onSettled: () => setFavId(""),
      });

      event.stopPropagation();
      event.preventDefault();
    },
    [favorites, setFavorites, showToast, toggleFavorites]
  );

  return { handleFavorites, favId };
};

export default useHandleFavorites;
