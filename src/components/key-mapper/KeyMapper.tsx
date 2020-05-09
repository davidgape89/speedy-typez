import React, { useEffect, useState } from 'react';

export interface KeyMap {
  [code: number]: boolean;
}

interface KeyboardMapperProps {
  children: (keys: KeyMap) => {};
}

export default function KeyMapper(props: KeyboardMapperProps) {
  const [keys, setKeys] = useState<KeyMap>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => setCode(event.keyCode, true);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => setCode(event.keyCode, false);
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener('keydown', handleKeyUp);
  }, []);

  function setCode(code: number, isActive: boolean) {
    setKeys((prevKeys: KeyMap) => {
      if(!!prevKeys[code] !== isActive) {
        return {
          ...prevKeys,
          [code]: isActive,
        };
      }
      return prevKeys;
    });
  };

  return (
    <div>
      {props.children(keys)}
    </div>
  );
}
