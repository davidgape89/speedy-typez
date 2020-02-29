interface KeyboardKey {
  code: number;
  key?: string;
  icon?: string;
}

export const ansiMap: KeyboardKey[][] = [
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
  ],
  [
    {
      key: 'a',
      code: 65,
    },
    {
      key: 's',
      code: 83,
    },
    {
      key: 'd',
      code: 68,
    },
    {
      key: 'f',
      code: 70,
    },
    {
      key: 'g',
      code: 71,
    },
    {
      key: 'h',
      code: 72,
    },
    {
      key: 'j',
      code: 74,
    },
    {
      key: 'k',
      code: 75,
    },
    {
      key: 'l',
      code: 76,
    },
  ],
  [
    {
      key: 'z',
      code: 90,
    },
    {
      key: 'x',
      code: 88,
    },
    {
      key: 'c',
      code: 67,
    },
    {
      key: 'v',
      code: 86,
    },
    {
      key: 'b',
      code: 66,
    },
    {
      key: 'n',
      code: 78,
    },
    {
      key: 'm',
      code: 77,
    },
  ],
  [
    {
      key: ' ',
      code: 32,
    },
  ],
];
