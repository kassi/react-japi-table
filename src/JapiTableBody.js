import React from 'react';
import PropTypes from 'prop-types';

export default class JapiTableBody extends React.Component {
  getAttribute (data, key) {
    let result = key === 'id' ? data[key]
      : (data.attributes && data.attributes[key]) ? data.attributes[key]
      : (data.relationships && data.relationships[key]) ? this.getIncluded(data.relationships[key].data)
      : undefined;
    return result;
  }

  getIncluded (relation_or_array) {
    let relations = Array.isArray(relation_or_array) ? relation_or_array : [relation_or_array];
    return relations.map((relation, i) => {
      return this.props.data.included.find((elem) => {
        return elem['type'] == relation['type'] && elem['id'] == relation['id'];
      });
    });
  }

  getValueOfKeyPath (keyPath, data) {
    if (keyPath.length == 1) {
      return [this.getAttribute(data, keyPath[0]), data];
    } else {
      const key = keyPath.shift();
      const relation = data.relationships && data.relationships[key] && data.relationships[key]['data'];
      if (relation) {
        const reference = this.getIncluded(relation)[0];
        return this.getValueOfKeyPath(keyPath, reference);
      }
      console.warn('relationship not found in data:', key);
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
      return column.renderValue(value, {rowData: data, objectData: value_object, getIncluded: this.getIncluded.bind(this)});
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
                if (!(column.group && column.groupColumn === 'hide')) {
                  return (
                    <td className={column['cellClassName']} key={'' + i + '-' + j}>
                      {this.getValue(row, column)}
                    </td>
                  );
                }
              })}
            </tr>
          );
        }) : undefined}
      </tbody>
    );
  }
}

JapiTableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
};
