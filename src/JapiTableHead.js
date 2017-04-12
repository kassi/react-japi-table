import React from 'react';

export default class JapiTableHead extends React.Component {
  render () {
    return (
      <thead>
        <tr>
          {this.props.columns ? this.props.columns.map((column, i) => {
            return (
              <th className={column['headerClassName']} key={i}>{column.header}</th>
            );
          }) : undefined}
        </tr>
      </thead>
    );
  }
}
