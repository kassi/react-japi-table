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

  it('renders an optional header cell className', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id',
        cellClassName: 'class1'
      },
      {
        key: 'title',
        header: 'Title',
        cellClassName: 'class2'
      }
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

  it('renders cell values with render function', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id'
      },
      {
        key: 'date',
        header: 'Date',
        renderValue: function (cellData) {
          return (
            <time datetime={cellData}>{cellData}</time>
          );
        }
      }
    ];
    const data = {
      data: [
        {
          id: '101',
          type: '_type',
          attributes: {
            date: '2017-04-10'
          }
        },
        {
          id: '102',
          type: '_type',
          attributes: {
            date: '2017-04-12'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });
});
