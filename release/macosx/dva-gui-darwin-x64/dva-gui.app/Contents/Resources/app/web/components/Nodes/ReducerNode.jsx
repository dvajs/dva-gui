import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import { Popover, Input } from 'antd';

class ReducerNode extends Component {
  render() {
    const popContent = (
      <div>
        <Input type="textarea" defaultValue={this.props.reducerContent} autosize />
      </div>
    );
    return (<div className="node node-reducer">
      <Popover
        content={popContent}
        trigger="click"
      >
        <div>
          { this.props.children }
        </div>
      </Popover>
    </div>);
  }
}

ReducerNode.propTypes = {};

export default createNode(() => ({
  getNodeData: (props) => props.data,
  canDrag: () => false,
}))(ReducerNode);
