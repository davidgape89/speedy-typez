import React, { useEffect, useState } from 'react';
import { ansiMap } from './ansiMap';
import './Keyboard.scss';

interface KeyMap {
  [code: number]: boolean
}

export default function Keyboard() {
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
    setKeys((prevKeys) => {
      if(!!prevKeys[code] !== isActive) {
        return {
          ...prevKeys,
          [code]: isActive,
        };
      }
      return prevKeys;
    });
  };

  function keyClassName(code: number): string {
    const classes = ['keyboard__key'];

    if(keys[code]) classes.push('active');

    return classes.join(' ');
  }

  return (
    <div className="keyboard">
      {ansiMap.map((row, index) => (
        <div key={index} className="keyboard__row">
          {row.map((key) => (
              <div key={key.code} className={keyClassName(key.code)}>
                <span>{key.key}</span>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

// export default () => {
//   const [st, setSt] = useState<{[key:string]:boolean}>({
//     2: true
//   });

//   function handleClick() {
//     setSt({
//       ...st,
//       1: false
//     });
//   }

//   function printObj() {
//     let array = []
//     for(let prop in st) {
//       array.push(st[prop]);
//     }
//     return array.map((el) => (<span>{el ? 'yes' : 'no'}</span>));
//   }

//   return (
//     <>
//       <div>{printObj()}</div>
//       <button onClick={handleClick}>Add</button>
//     </>
//   )
// }
