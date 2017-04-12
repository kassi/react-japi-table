import React from 'react';

export default class JapiTableBody extends React.Component {
  render () {
    return (
      <tbody>
        {this.props.data && this.props.data['data'] ? this.props.data['data'].map((row, i) => {
          return (
            <tr key={i}>
              {this.props.columns.map((column, j) => {
                const key = column.key;
                let value = key === 'id' ? row['id'] : (typeof row['attributes'] !== 'undefined' ? row['attributes'][key] : undefined);
                return (
                  <td key={'' + i + '-' + j}>
                    {value}
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
