import React, { useRef, MutableRefObject } from 'react';
import { Timer, TimerDirection, TimerRef } from './Timer';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

test('renders correctly', () => {
  const { container } = render(<Timer initTime={60} onTimeOver={()=>{}}/>);

  expect(container.firstChild).toMatchSnapshot();
});

test('ticks correctly', () => {
  render(
    <Timer
      initTime={2}
      direction={TimerDirection.DESC}
      onTimeOver={() => {}}
    />
  );

  // TODO - Do this in a more clever way?
  expect(screen.getByText('00:02')).toBeTruthy();

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText('00:01')).toBeTruthy();

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText('00:00')).toBeTruthy();
});

test('calls onTimeOver func when timer reaches 0', () => {
  const timeOverFn = jest.fn();
  render(
    <Timer
      initTime={3}
      direction={TimerDirection.DESC}
      onTimeOver={timeOverFn}
    />
  );

  act(() => {
    jest.runAllTimers();
  });

  expect(timeOverFn).toHaveBeenCalled();
});

test('does not run when it is not running', () => {
  const { rerender } = render(
    <Timer
      initTime={3}
      direction={TimerDirection.DESC}
      onTimeOver={() => {}}
    />
  );
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText('00:02'));

  rerender(
    <Timer
      initTime={3}
      isRunning={false}
      direction={TimerDirection.DESC}
      onTimeOver={() => {}}
    />
  );
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByText('00:02'));
});
