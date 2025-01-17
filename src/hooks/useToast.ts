import { useContext } from "react";
import messages from "../constants/messages";
import { ToastContext } from "../context/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(messages.toast.contextError);
  }
  return context;
};
