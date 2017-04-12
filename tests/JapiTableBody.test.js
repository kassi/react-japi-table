import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import JapiTableBody from '../src/JapiTableBody';

describe('JapiTableHead', () => {
  it('renders a tbody', () => {
    expect(shallow(<JapiTableBody />).type()).toBe('tbody');
  });

  it('renders a table row for each data entry', () => {
    const columns = [
      { key: 'id', header: 'Id' },
      { key: 'title', header: 'Title' }
    ];
    const data = {
      data: [
        {
          id: '1',
          type: '_type'
        },
        {
          id: '2',
          type: '_type'
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });

  it('renders appropriate cell values', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id'
      },
      {
        key: 'title',
        header: 'Title'
      }
    ];
    const data = {
      data: [
        {
          id: '101',
          type: '_type',
          attributes: {
            title: 'Title 1'
          }
        },
        {
          id: '102',
          type: '_type',
          attributes: {
            title: 'Title 2'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });
});
