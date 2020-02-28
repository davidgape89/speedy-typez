import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SpeedTest from './SpeedTest';

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
  // back to enzyme?
  //wrapper.getByTestId('timer').getAttribute('isRunning').toBe(true);
});
