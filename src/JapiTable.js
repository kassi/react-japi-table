import React from 'react';
import PropTypes from 'prop-types';

import JapiTableHead from './JapiTableHead';
import JapiTableBody from './JapiTableBody';

export default class JapiTable extends React.Component {
  render () {
    return (
      <table className={this.props.className}>
        <JapiTableHead columns={this.props.columns} />
        <JapiTableBody columns={this.props.columns} data={this.props.data} />
      </table>
    );
  }
}

JapiTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
};
