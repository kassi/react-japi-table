import React from 'react';

import JapiTableHead from './JapiTableHead';
import JapiTableBody from './JapiTableBody';

export default class JapiTable extends React.Component {
  render () {
    const className = 'tablesorter' + (typeof this.props.className !== 'undefined' ? ' ' + this.props.className : '');
    return (
      <table className={className}>
        <JapiTableHead columns={this.props.columns} />
        <JapiTableBody columns={this.props.columns} />
      </table>
    );
  }
}
