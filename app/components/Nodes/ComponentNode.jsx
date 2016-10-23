import React, { PropTypes } from 'react';
import { Icon, Tooltip, Popconfirm } from 'antd';
import { createNode } from 'rc-fringing';
import Rect from '../Geometry/Rect';


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
  showActionFlow = () => {
    const nodeId = encodeURIComponent(this.props.data.id);
    this.context.router.push(`/graph/dataflow/${nodeId}`);
  }
  render() {
    const CNode = this.drawNode();
    return (
      <div>
        <CNode className="node-component">
          { this.props.children }
          <div className="node-icons">
            <Tooltip placement="top" title={'dispatch a new action'}>
              <Icon type="right-square-o" />
            </Tooltip>
            <Tooltip placement="top" title={'source code'}>
              <Icon type="code-o" />
            </Tooltip>
            <Tooltip placement="top" title={'show detail action flow'}>
              <Icon type="folder" onClick={this.showActionFlow} />
            </Tooltip>
            <Popconfirm
              placement="right"
              title="Are you sure to delete this component?"
              onConfirm={() => { this.props.removeComponent(this.props.data.id); }}
              okText="Yes" cancelText="No"
            >
              <Tooltip placement="top" title={'delete'}>
                <Icon type="delete" />
              </Tooltip>
            </Popconfirm>
          </div>
        </CNode>
      </div>
    );
  }
}

ComponentNode.propTypes = {
  data: PropTypes.object.isRequired,
  removeComponent: PropTypes.func,
};
ComponentNode.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default ComponentNode;
