import React, { PropTypes } from 'react';

class Paper extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Paper;
