import React, { PropTypes } from 'react';
import { createNode } from 'rc-fringing';
import Rect from '../Geometry/Rect';
import { Icon, Dropdown, Menu } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">Dispatch an action</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">Show action flows</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Delete</Menu.Item>
  </Menu>
);

class ComponentNode extends React.Component {
  drawNode() {
    const { data } = this.props;
    if (!this.node) {
      this.node = createNode(
        () => ({
          getNodeData: () => data,
          canDrag: () => false,
        })
      )(Rect);
    }
    return this.node;
  }
  render() {
    const CNode = this.drawNode();
    return (
      <div>
        <CNode className="node-component">
          { this.props.children }
          <div className="node-icons">
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="bars" />
            </Dropdown>
          </div>
        </CNode>
      </div>
    );
  }
}

ComponentNode.propTypes = {
  data: PropTypes.object,
};
export default ComponentNode;
