import React from 'react';
import renderer from 'react-test-renderer';
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

  it('renders a cell for each column', () => {
    const columns = [
      { header: 'Id' },
      { header: 'Title' }
    ];
    const node = renderer.create(<JapiTableHead columns={columns} />).toJSON();
    expect(node).toMatchSnapshot();
  });

  it('renders an optional header cell className', () => {
    const columns = [
      {
        header: 'Id',
        headerClassName: 'class1'
      },
      {
        header: 'Title',
        headerClassName: 'class2'
      }
    ];
    const node = renderer.create(<JapiTableHead columns={columns} />).toJSON();
    expect(node).toMatchSnapshot();
  });

  it('hides a group column when gropuColumn is set to "hide"', () => {
    const columns = [
      {
        header: 'Id',
        headerClassName: 'class1',
        group: true,
        groupColumn: 'hide'
      },
      {
        header: 'Title',
        headerClassName: 'class2'
      }
    ];
    const node = renderer.create(<JapiTableHead columns={columns} />).toJSON();
    expect(node).toMatchSnapshot();
  });
});
