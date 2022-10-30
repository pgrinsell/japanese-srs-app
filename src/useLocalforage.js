import { useState, useEffect } from 'react';
import localforage from 'localforage';

const useLocalforage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    (async () => {
      try {
        const value = await localforage.getItem(key);
        setStoredValue(value);
      } catch (err) {
        console.err('err', err);
        return initialValue;
      }
    })();

    console.log(initialValue, key);
  }, [key]);

  const setValue = (value) => {
    (async () => {
      try {
        await localforage.setItem(key, value);
        const newValue = await localforage.getItem(key);
        setStoredValue(newValue);
      } catch (err) {
        return initialValue;
      }
    })();
  };

  useEffect(() => {
    console.log('storedValue', storedValue);
  }, [storedValue]);

  return [storedValue, setValue];
};

export default useLocalforage;