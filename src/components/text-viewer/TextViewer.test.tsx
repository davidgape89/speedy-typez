import React from 'react';
import { render } from '@testing-library/react';
import { TextViewer } from './TextViewer';
import { englishText } from '../speed-test/words';

const words = englishText.split(' ');
const inputStack = ['hey', 'hows', 'are', 'you', 'thise', 'is', 'a', 'liest', 'of', 'different', 'english', 'words', 'just', 'to', 'perform', 'a', 'typing', 'speed'];
const activeInput = 'te';

test('renders correctly', () => {
  const wrapper = render(<TextViewer
    words={words}
    inputStack={inputStack}
    activeInput={activeInput}
  />);

  expect(wrapper.container.firstChild).toMatchSnapshot();
});

test('active element is scrolled into view', () => {
  const scrollFn = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollFn;
  const {rerender} = render(<TextViewer
    words={words}
    inputStack={inputStack}
    activeInput={activeInput}
  />);

  expect(scrollFn).toHaveBeenCalled();

  rerender(<TextViewer
    words={words}
    inputStack={[]}
    activeInput={activeInput}
  />);

  expect(scrollFn).toHaveBeenCalled();
});
