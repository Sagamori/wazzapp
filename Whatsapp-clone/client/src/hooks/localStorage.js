import { useEffect, useState } from 'react';

const PREFIX = 'whatsapp-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  //using useState to get value from localStorage
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  // saves ids if prefixedKey or/and value changes
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
