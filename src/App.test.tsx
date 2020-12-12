import React from 'react';
import App from './App';
import { render } from '@testing-library/react';

test('renders correctly', () => {
  const wrapper = render(<App />);

  expect(wrapper.container.firstChild).toMatchSnapshot();
});
