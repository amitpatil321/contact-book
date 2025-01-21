import { createContext } from "react";

interface ToastContextType {
  showToast: (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string
  ) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
