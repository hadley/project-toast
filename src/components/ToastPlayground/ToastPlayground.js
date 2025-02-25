import React from "react";

import ToastShelf from "../ToastShelf/ToastShelf";
import Button from "../Button";
import { useToast } from "../ToastProvider/ToastProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />
      <ToastForm />
    </div>
  );
}

function ToastForm() {
  const [message, setMessage] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState("notice");
  const { addToast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();
    addToast({ message, variant: selectedVariant });
    setMessage("");
    setSelectedVariant("notice");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
      <div className={styles.row}>
        <label
          htmlFor="message"
          className={styles.label}
          style={{ alignSelf: "baseline" }}
        >
          Message
        </label>
        <div className={styles.inputWrapper}>
          <textarea
            id="message"
            className={styles.messageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Variant</div>
        <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
          {VARIANT_OPTIONS.map((variant) => (
            <label key={variant}>
              <input
                type="radio"
                name="variant"
                value={variant}
                checked={selectedVariant === variant}
                onChange={() => setSelectedVariant(variant)}
              />
              {variant}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label} />
        <div className={styles.inputWrapper}>
          <Button type="submit" disabled={!message}>
            Pop Toast!
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
