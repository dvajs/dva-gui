import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';

class ActionNode extends Component {
  render() {
    return (<div className="node node-action">
      <div className="node-action-overlay">
        { this.props.children || this.props.data.id}
      </div>
    </div>);
  }
}

ActionNode.propTypes = {};

export default createNode(() => ({
  getNodeData: (props) => props.data,
  canDrag: () => false,
}))(ActionNode);
