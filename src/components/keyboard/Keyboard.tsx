import React from 'react';
import { ansiMap } from './ansiMap';
import './Keyboard.scss';
import { useKeyMap } from './useKeyMap';

export default function Keyboard() {
  const keyMap = useKeyMap();

  function keyClassName(key?: string): string {
    const classes = ['keyboard__key'];

    if(key && keyMap[key]) classes.push('active');

    return classes.join(' ');
  }

  return (
    <div className="keyboard">
      {ansiMap.map((row, index) => (
        <div key={index} className="keyboard__row">
          {row.map((key) => (
              <div key={key.key} className={keyClassName(key.key)}>
                <span>{key.key}</span>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
