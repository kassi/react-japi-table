import React from 'react';
import { shallow } from 'enzyme';

import JapiTableHead from '../src/JapiTableHead';

describe('JapiTableHead', () => {
  it('renders a thead', () => {
    expect(shallow(<JapiTableHead />).type()).toBe('thead');
  });
});
