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

  it('renders row values with render function', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id'
      },
      {
        key: 'date',
        header: 'Date',
        renderValue: function (cellData, { rowData }) {
          return (
            <time datetime={cellData}>{rowData.attributes.other}</time>
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
            date: '2017-04-10',
            other: 'some other value'
          }
        },
        {
          id: '102',
          type: '_type',
          attributes: {
            date: '2017-04-12',
            other: 'another other value'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });

  it('renders cell values of 1:1 relationships', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id'
      },
      {
        key: 'game.title',
        header: 'Titel'
      }
    ];
    const data = {
      data: [
        {
          id: '101',
          type: 'matches',
          attributes: {
            date: '2017-04-10'
          },
          relationships: {
            game: {
              data: {
                id: '201',
                type: 'games'
              }
            }
          }
        },
        {
          id: '102',
          type: 'matches',
          attributes: {
            date: '2017-04-12'
          },
          relationships: {
            game: {
              data: {
                id: '202',
                type: 'games'
              }
            }
          }
        }
      ],
      included: [
        {
          id: '201',
          type: 'games',
          attributes: {
            title: 'Game no 1'
          }
        },
        {
          id: '202',
          type: 'games',
          attributes: {
            title: 'Game no 2'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });

  it('renders object values of relationships with render function', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id'
      },
      {
        key: 'game.title',
        header: 'Titel',
        renderValue: function (cellData, { objectData }) {
          return objectData.attributes.other;
        }
      }
    ];
    const data = {
      data: [
        {
          id: '101',
          type: 'matches',
          attributes: {
            date: '2017-04-10'
          },
          relationships: {
            game: {
              data: {
                id: '201',
                type: 'games'
              }
            }
          }
        },
        {
          id: '102',
          type: 'matches',
          attributes: {
            date: '2017-04-12'
          },
          relationships: {
            game: {
              data: {
                id: '202',
                type: 'games'
              }
            }
          }
        }
      ],
      included: [
        {
          id: '201',
          type: 'games',
          attributes: {
            title: 'Game no 1',
            other: 'game 1 other'
          }
        },
        {
          id: '202',
          type: 'games',
          attributes: {
            title: 'Game no 2',
            other: 'game 2 other'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });

  it('adds links to unrendered value', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id',
        autolink: true
      },
      {
        key: 'game.title',
        header: 'Titel',
        autolink: true
      }
    ];
    const data = {
      data: [
        {
          id: '101',
          type: 'matches',
          attributes: {
            date: '2017-04-10'
          },
          links: {
            self: 'http://example.com/matches/101'
          },
          relationships: {
            game: {
              data: {
                id: '201',
                type: 'games'
              }
            }
          }
        },
        {
          id: '102',
          type: 'matches',
          attributes: {
            date: '2017-04-12'
          },
          links: {
            self: 'http://example.com/matches/102'
          },
          relationships: {
            game: {
              data: {
                id: '202',
                type: 'games'
              }
            }
          }
        }
      ],
      included: [
        {
          id: '201',
          type: 'games',
          attributes: {
            title: 'Game no 1'
          },
          links: {
            self: 'http://example.com/games/201'
          }
        },
        {
          id: '202',
          type: 'games',
          attributes: {
            title: 'Game no 2'
          },
          links: {
            self: 'http://example.com/games/202'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });

  it('has access to related objects via key path and renderValue function', () => {
    const columns = [
      {
        key: 'id',
        header: 'Id'
      },
      {
        key: 'date',
        header: 'Date'
      },
      {
        key: 'participations',
        header: 'Participations',
        renderValue: function (cellData, { rowData }) {
          return cellData.length;
        }
      },
      {
        key: 'participations',
        header: 'Participations',
        renderValue: function (cellData, { objectData, getIncluded }) {
          const winners = cellData.filter((elem, i) => {
            return elem.attributes.winner;
          });
          const names = winners.map((elem, i) => {
            return getIncluded(elem.relationships.player.data).map((player) => {
              return player.attributes.name;
            });
          });
          return names.join(', ');
        }
      }
    ];
    const data = {
      data: [
        {
          id: '201',
          type: 'matches',
          attributes: {
            date: '2017-04-10'
          },
          relationships: {
            participations: {
              data: [
                {
                  id: '301',
                  type: 'participations'
                },
                {
                  id: '302',
                  type: 'participations'
                }
              ]
            }
          }
        }
      ],
      included: [
        {
          id: '301',
          type: 'participations',
          attributes: {
            points: 51,
            winner: true
          },
          relationships: {
            player: {
              data: {
                id: '401',
                type: 'players'
              }
            }
          }
        },
        {
          id: '302',
          type: 'participations',
          attributes: {
            points: 47,
            winner: false
          },
          relationships: {
            player: {
              data: {
                id: '402',
                type: 'players'
              }
            }
          }
        },
        {
          id: '401',
          type: 'players',
          attributes: {
            name: 'player one'
          }
        },
        {
          id: '402',
          type: 'players',
          attributes: {
            name: 'player two'
          }
        }
      ]
    };
    const node = renderer.create(<JapiTableBody columns={columns} data={data} />);
    expect(node).toMatchSnapshot();
  });
});
