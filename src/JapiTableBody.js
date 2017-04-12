import React from 'react';

export default class JapiTableBody extends React.Component {
  render () {
    return (
      <tbody>
        {this.props.data && this.props.data['data'] ? this.props.data['data'].map((row, i) => {
          return (
            <tr key={i} />
          );
        }) : undefined}
      </tbody>
    );
  }
}
