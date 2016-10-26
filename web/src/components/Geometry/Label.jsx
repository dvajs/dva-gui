import React, { PropTypes } from 'react';

class Label extends React.Component {
  render() {
    return (
      <div style={{ padding: 10 }}>
        { this.props.children }
      </div>
    );
  }
}

export default Label;
