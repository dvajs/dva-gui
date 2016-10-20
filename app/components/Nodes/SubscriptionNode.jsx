import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';

class SubscriptionNode extends Component {
  render() {
    return (<div>
      { this.props.children }
    </div>);
  }
}

SubscriptionNode.propTypes = {};

export default createNode(() => ({
  getNodeData: (props) => props.data,
  canDrag: () => false,
}))(SubscriptionNode);
