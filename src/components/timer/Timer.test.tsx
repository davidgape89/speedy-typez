import React from 'react';
import {shallow} from 'enzyme';
import {Timer} from './Timer';

test('renders correctly', () => {
  const wrapper = shallow(<Timer initTime={60} onTimeOver={()=>{}}/>);

  expect(wrapper).toMatchSnapshot();
});
