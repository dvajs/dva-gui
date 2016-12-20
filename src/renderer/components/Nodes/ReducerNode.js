import React, { Component, PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import { Popover } from 'antd';
import classNames from 'classnames';
import ReducerForm from '../common/ReducerForm';

class ReducerNode extends Component {
  handleSave = (values) => {
    this.props.onSave(values);
  }
  render() {
    const { ghost, className, source, name, onSave, namespace } = this.props;
    const cls = classNames({
      [className]: !!className,
      node: true,
      'node-reducer': true,
      ghost,
    });
    const popContent = (
      <div>
        <ReducerForm
          namespace={namespace}
          name={name}
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

ReducerNode.propTypes = {};

export default createNode(() => ({
  getNodeData: (props) => props.data,
  canDrag: () => false,
}))(ReducerNode);

