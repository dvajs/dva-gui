import React, { Component } from 'react';
import { createNode } from 'rc-fringing';
import { Popover } from 'antd';
import classNames from 'classnames';
import EffectForm from '../common/EffectForm';

class EffectNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  setVisible = (visible) => {
    this.setState({
      visible,
    });
  }
  handleSave = (values) => {
    this.props.onSave(values);
    this.setVisible(false);
  }
  render() {
    const { ghost, className, source, name, namespace } = this.props;
    const cls = classNames({
      [className]: !!className,
      node: true,
      'node-effect': true,
      ghost,
    });

    const effectName = name.replace(new RegExp(`${namespace}/`, 'g'), '');
    const popContent = (
      <div>
        <EffectForm
          namespace={namespace}
          name={effectName}
          source={source}
          onSave={this.handleSave}
          onCancel={() => {
            this.setVisible(false);
          }}
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

