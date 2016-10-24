import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { createNode } from 'rc-fringing';
import { Icon, Tooltip, Popconfirm } from 'antd';
import Rect from '../Geometry/Rect';


class ModelNode extends React.Component {
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
    const MNode = this.drawNode();
    return (
      <MNode className="node-model">
        { this.props.children }
        <div className="node-icons">
          <Tooltip placement="top" title={'show detail action flow'}>
            <Icon type="folder" onClick={this.showActionFlow} />
          </Tooltip>
          <Popconfirm
            placement="right"
            title="Are you sure to delete this component?"
            onConfirm={() => { this.props.removeModel(this.props.data.id); }}
            okText="Yes" cancelText="No"
          >
            <Tooltip placement="top" title={'delete'}>
              <Icon type="delete" />
            </Tooltip>
          </Popconfirm>
        </div>
      </MNode>
    );
  }
}

ModelNode.propTypes = {
  data: PropTypes.object,
  children: PropTypes.any,
  removeModel: PropTypes.func,
};

ModelNode.contextTypes = {
  router: PropTypes.object,
};
export default connect(({ dataflow }) => ({ dataflow }))(ModelNode);
