import React from 'react';
import { shallow, mount } from 'enzyme';

import JapiTableHead from '../src/JapiTableHead';

describe('JapiTableHead', () => {
  const table = document.createElement('table');

  it('renders a thead', () => {
    expect(shallow(<JapiTableHead />).type()).toBe('thead');
  });

  it('renders a table row', () => {
    const node = mount(<JapiTableHead />, { attachTo: table });
    expect(node.html()).toEqual('<thead><tr></tr></thead>');
  });
});
