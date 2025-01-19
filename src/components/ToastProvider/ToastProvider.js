import React from "react";

const ToastContext = React.createContext();

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastContext");
  }
  return context;
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(({ message, variant }) => {
    const newToast = { id: crypto.randomUUID(), message, variant };
    setToasts((toasts) => [...toasts, newToast]);
  }, []);
  const removeToast = React.useCallback((toastId) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId));
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setToasts([]);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const value = React.useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
