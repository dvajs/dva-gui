import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';

class Label extends React.Component {
  render() {
    return (
      <div style={{ padding: 10 }}>
        { this.props.children }
      </div>
    );
  }
}

export default createNode(() => ({
  getNodeData: props => props.data,
  canDrag: () => false,
}))(Label);
