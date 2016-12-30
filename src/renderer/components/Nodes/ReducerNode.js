import React, { Component } from 'react';
import { createNode } from 'rc-fringing';
import { Popover } from 'antd';
import classNames from 'classnames';
import ReducerForm from '../common/ReducerForm';

class ReducerNode extends Component {
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
      'node-reducer': true,
      ghost,
    });

    const reducerName = name.replace(new RegExp(`${namespace}/`, 'g'), '');
    const popContent = (
      <div>
        <ReducerForm
          namespace={namespace}
          name={reducerName}
          source={source}
          onSave={this.handleSave}
          onCancel={() => {
            this.setVisible(false);
          }}
        />
      </div>
    );
    return (<Popover content={popContent} trigger="click" visible={this.state.visible} onVisibleChange={this.setVisible}>
      <div className={cls}>
        { this.props.children }
      </div>
    </Popover>);
  }
}

ReducerNode.propTypes = {};

export default createNode(() => ({
  getNodeData: props => props.data,
  canDrag: () => false,
}))(ReducerNode);

