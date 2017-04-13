import React from 'react';

export default class JapiTableBody extends React.Component {
  getValue (row, column) {
    const key = column.key;
    let value = key === 'id' ? row['id'] : (typeof row['attributes'] !== 'undefined' ? row['attributes'][key] : undefined);
    if (column.renderValue) {
      value = column.renderValue(value);
    }
    return value;
  }

  render () {
    return (
      <tbody>
        {this.props.data && this.props.data['data'] ? this.props.data['data'].map((row, i) => {
          return (
            <tr key={i}>
              {this.props.columns.map((column, j) => {
                return (
                  <td className={column['cellClassName']} key={'' + i + '-' + j}>
                    {this.getValue(row, column)}
                  </td>
                );
              })}
            </tr>
          );
        }) : undefined}
      </tbody>
    );
  }
}
