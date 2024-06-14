// Based on:
// * https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useLocalStorage/useLocalStorage.ts
// * https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts

import { useCallback, useState } from 'react';
import type { Dispatch } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): {
  storedValue: T,
  setValue: Dispatch<T>,
  removeValue: () => void
} => {
  const serializer = useCallback<(value: T) => string>(JSON.stringify, []);
  const deserializer = useCallback<(value: string) => T>(JSON.parse, [],);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        return deserializer(raw);
      } else {
        if (initialValue)
          localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  const setValue: Dispatch<T> = useCallback(value => {
    try {
      window.localStorage.setItem(key, serializer(value));
      setStoredValue(value);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, []);

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, []);

  return { storedValue, setValue, removeValue };
}

export default useLocalStorage;