import React from "react";

import Toast from "../Toast";
import { useToast } from "../ToastProvider";
import styles from "./ToastShelf.module.css";
import VisuallyHidden from "../VisuallyHidden";

function ToastShelf() {
  const { toasts, removeToast } = useToast();

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            variant={toast.variant}
            handleDismiss={() => removeToast(toast.id)}
            message={toast.message}
          />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
