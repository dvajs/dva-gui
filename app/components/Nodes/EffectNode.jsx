import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import { Popover, Input } from 'antd';
import classNames from 'classnames';

class EffectNode extends Component {
  render() {
    const { ghost, className } = this.props;
    const cls = classNames({
      [className]: !!className,
      node: true,
      'node-effect': true,
      ghost,
    });
    const popContent = (
      <div>
        <Input type="textarea" defaultValue={this.props.effectContent} autosize />
      </div>
    );
    return (<div className={cls}>
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
