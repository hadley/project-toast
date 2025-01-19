import React from "react";

function useKey(key, callback) {
  React.useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === key) {
        callback();
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [key, callback]);
}

export default useKey;
