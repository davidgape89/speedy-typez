import React from 'react';
import { Timer } from './Timer';
import { render, screen } from '@testing-library/react';

test('renders correctly', () => {
  const wrapper = render(<Timer initTime={60} onTimeOver={()=>{}}/>);

  expect(wrapper.container.firstChild).toMatchSnapshot();
});

test('ticks correctly', () => {
  render(
    <Timer
      initTime={60}
      onTimeOver={() => {}}
    />
  );
  expect(screen.getByText('01:00')).toBeTruthy();
});
