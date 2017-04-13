import React from 'react';

export default class JapiTableBody extends React.Component {
  getAttribute (data, key) {
    return key === 'id' ? data[key] : (typeof data['attributes'] !== 'undefined' ? data['attributes'][key] : undefined);
  }

  getIncluded (relation) {
    return this.props.data.included.find((elem) => {
      return elem['type'] == relation['type'] && elem['id'] == relation['id'];
    });
  }

  getValueOfKeyPath (keyPath, data) {
    if (keyPath.length == 1) {
      return [this.getAttribute(data, keyPath[0]), data];
    } else {
      const key = keyPath.shift();
      const relation = data['relationships'][key]['data'];
      if (relation) {
        const reference = this.getIncluded(relation);
        return this.getValueOfKeyPath(keyPath, reference);
      }
      return undefined;
    }
  }

  getValue (data, column) {
    const key = column.key;
    const keyPath = key.split('.');
    let value_and_object = this.getValueOfKeyPath(keyPath, data, column);
    let value = Array.isArray(value_and_object) ? value_and_object[0] : value_and_object;
    let value_object = Array.isArray(value_and_object) ? value_and_object[1] : data;

    if (column.renderValue) {
      return column.renderValue(value, {rowData: data});
    }
    if (column.autolink && !!(value_object.links && value_object.links.self)) {
      return (
        <a href={value_object.links.self}>{value}</a>
      );
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
