import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SpeedTest from './SpeedTest';
import { TextViewer } from '../text-viewer/TextViewer';
import { Timer } from '../timer/Timer';

jest.mock('../text-viewer/TextViewer', () => ({
  TextViewer: jest.fn(() => <div>Text viewer</div>),
}));
jest.mock('../timer/Timer', () => ({
  Timer: jest.fn(() => <div>Timer</div>),
}));

test('renders correctly', () => {
  const wrapper = render(<SpeedTest />);

  expect(wrapper.container.firstChild).toMatchSnapshot();
});

test('starts running once something is typed', () => {
  const wrapper = render(<SpeedTest />);
  const input = wrapper.getByTestId('input-field');

  fireEvent.change(input, {
    target: {
      value: 'something',
    },
  });

  jest.runAllTimers();

  expect(Timer).toHaveBeenCalledWith({isRunning: true});
  // back to enzyme?
  //wrapper.getByTestId('timer').getAttribute('isRunning').toBe(true);
});
