import React from 'react';
import { shallow } from 'enzyme';

import JapiTable from '../src/JapiTable';

describe('JapiTable', () => {
  it('renders a table', () => {
    expect(shallow(<JapiTable />).type()).toBe('table');
  });

  it('adds tablesorter class', () => {
    expect(shallow(<JapiTable />).hasClass('tablesorter')).toBeTruthy();
  });

  it('adds all given class names', () => {
    const node = shallow(<JapiTable className='one two' />);
    expect(node.hasClass('tablesorter')).toBeTruthy();
    expect(node.hasClass('one')).toBeTruthy();
    expect(node.hasClass('two')).toBeTruthy();
  });

  it('renders the head component', () => {
    const node = shallow(<JapiTable />);
    expect(node.find('JapiTableHead').length).toEqual(1);
  });

  it('passes columns prop to head component', () => {
    const node = shallow(<JapiTable columns={'_columns'} />);
    expect(node.find('JapiTableHead').prop('columns')).toEqual('_columns');
  });
});
