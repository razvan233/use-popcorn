import { useEffect, useState } from "react";

export const useLocalStorage = (initialState, localStorageKey) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(localStorageKey);
    if (storedValue === null) return initialState;
    return JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
};
