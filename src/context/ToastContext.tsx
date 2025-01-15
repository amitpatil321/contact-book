import { Toast } from "primereact/toast";
import React, { createContext, useRef } from "react";

interface ToastContextType {
  showToast: (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string
  ) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
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

// export default ToastProvider;
