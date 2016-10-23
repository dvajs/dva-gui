import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { createNode } from 'rc-fringing';
import { Icon, Tooltip } from 'antd';
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
          <Tooltip placement="top" title={'delete'}>
            <Icon type="delete" />
          </Tooltip>
        </div>
      </MNode>
    );
  }
}

ModelNode.propTypes = {
  data: PropTypes.object,
  children: PropTypes.any,
  dispatch: PropTypes.func,
};

ModelNode.contextTypes = {
  router: PropTypes.object,
};
export default connect(({ dataflow }) => ({ dataflow }))(ModelNode);
