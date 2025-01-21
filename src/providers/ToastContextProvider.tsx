import { Toast } from "primereact/toast";
import { useRef } from "react";
import { ToastContext } from "../context/ToastContext";

export const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useRef<Toast>(null);

  const showToast = (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};
