import React from 'react';

export default class JapiTable extends React.Component {
  render () {
    const className = 'tablesorter' + (typeof this.props.className !== 'undefined' ? ' ' + this.props.className : '');
    return (
      <table className={className} />
    );
  }
}
