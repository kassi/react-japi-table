import React from 'react';
import { shallow } from 'enzyme';

import JapiTable from '../src/JapiTable';

describe('JapiTable', () => {
  it('renders a table', () => {
    expect(shallow(<JapiTable />).type()).toBe('table');
  });
});
