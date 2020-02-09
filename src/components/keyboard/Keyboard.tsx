import React from 'react';

interface KeyboardKey {
  code: number;
  key?: string;
  icon?: string;
}
81
 87
 69
 82
 84
 89
 85
 73
 79
 80

const keys: KeyboardKey[][] = [
  [
    {
      key: 'q',
      code: 81,
    },
    {
      key: 'w',
      code: 87,
    },
    {
      key: 'e',
      code: 69,
    },
    {
      key: 'r',
      code: 82,
    },
    {
      key: 't',
      code: 84,
    },
    {
      key: 'y',
      code: 89,
    },
    {
      key: 'u',
      code: 85,
    },
    {
      key: 'i',
      code: 73,
    },
    {
      key: 'o',
      code: 79,
    },
    {
      key: 'p',
      code: 80,
    }
  ]
]

export const Keyboard = () => {

  return (
    <div></div>
  );
}
