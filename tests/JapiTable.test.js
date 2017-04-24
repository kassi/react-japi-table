import React from 'react';
import { shallow } from 'enzyme';

import JapiTable from '../src/JapiTable';

describe('JapiTable', () => {
  it('renders a table', () => {
    expect(shallow(<JapiTable columns={[]} data={{}} />).type()).toBe('table');
  });

  it('expects columns prop being set to be present', function () {
    expect(shallow(<JapiTable columns={[]} data={{}} />).type()).toBe('table');
  });

  it('adds all given class names', () => {
    const node = shallow(<JapiTable columns={[]} data={{}} className='one two' />);
    expect(node.hasClass('one')).toBeTruthy();
    expect(node.hasClass('two')).toBeTruthy();
  });

  it('renders the head component', () => {
    const node = shallow(<JapiTable columns={[]} data={{}} />);
    expect(node.find('JapiTableHead').length).toEqual(1);
  });

  it('passes columns prop to head component', () => {
    const node = shallow(<JapiTable columns={[{test: 1}]} data={{}} />);
    expect(node.find('JapiTableHead').prop('columns')).toEqual([{test: 1}]);
  });

  it('renders the body component', () => {
    const node = shallow(<JapiTable columns={[]} data={{}} />);
    expect(node.find('JapiTableBody').length).toEqual(1);
  });

  it('passes columns prop to body component', () => {
    const node = shallow(<JapiTable columns={[{test: 1}]} data={{}} />);
    expect(node.find('JapiTableBody').prop('columns')).toEqual([{test: 1}]);
  });

  it('passes data prop to body component', () => {
    const node = shallow(<JapiTable columns={[]} data={{test: 1}} />);
    expect(node.find('JapiTableBody').prop('data')).toEqual({test: 1});
  });
});
