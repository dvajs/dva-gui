import React, { Component } from 'react';
import { createNode } from 'rc-fringing';
import { Popover } from 'antd';
import classNames from 'classnames';
import EffectForm from '../common/EffectForm';

class EffectNode extends Component {
  handleSave = (values) => {
    this.props.onSave(values);
  }
  render() {
    const { ghost, className, source, name, namespace } = this.props;
    const cls = classNames({
      [className]: !!className,
      node: true,
      'node-effect': true,
      ghost,
    });

    const x = new RegExp(`${namespace}/`, 'g');
    const reducerName = name.replace(x, '');
    console.warn(x);
    console.warn(reducerName);
    const popContent = (
      <div>
        <EffectForm
          namespace={namespace}
          name={reducerName}
          source={source}
          onSave={this.handleSave}
        />
      </div>
    );
    return (<Popover content={popContent} trigger="click">
      <div className={cls}>
        { this.props.children }
      </div>
    </Popover>);
  }
}

EffectNode.propTypes = {};

export default createNode(() => ({
  getNodeData: props => props.data,
  canDrag: () => false,
}))(EffectNode);

