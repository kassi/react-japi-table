import React from 'react';
import { shallow } from 'enzyme';

import JapiTableBody from '../src/JapiTableBody';

describe('JapiTableHead', () => {
  it('renders a tbody', () => {
    expect(shallow(<JapiTableBody />).type()).toBe('tbody');
  });
});
