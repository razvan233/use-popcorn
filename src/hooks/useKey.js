import { useEffect } from "react";

export const useKey = (event, eventHandler, additionalCallback) => {
  useEffect(() => {
    additionalCallback?.();
    document.addEventListener(event, eventHandler);
    return () => document.removeEventListener(event, eventHandler);
  }, [event, eventHandler, additionalCallback]);
};
