import {useEffect, useState} from 'react';

export interface KeyMap {
  [key: string]: boolean;
}

export const useKeyMap = () => {
  const [keys, setKeys] = useState<KeyMap>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => setCode(event.key, true);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => setCode(event.key, false);
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener('keydown', handleKeyUp);
  }, []);

  function setCode(key: string, isActive: boolean) {
    console.log(key);
    setKeys((prevKeys: KeyMap) => {
      if(!!prevKeys[key] !== isActive) {
        return {
          ...prevKeys,
          [key]: isActive,
        };
      }
      return prevKeys;
    });
  };

  return keys;
}