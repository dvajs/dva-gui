import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import { Popover, Input } from 'antd';

class EffectNode extends Component {
  render() {
    const popContent = (
      <div>
        <Input type="textarea" defaultValue={this.props.effectContent} autosize />
      </div>
    );
    return (<div className="node node-effect">
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

EffectNode.propTypes = {};

export default createNode(() => ({
  getNodeData: (props) => props.data,
  canDrag: () => false,
}))(EffectNode);
