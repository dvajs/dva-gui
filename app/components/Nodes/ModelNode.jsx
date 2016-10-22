import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { createNode } from 'rc-fringing';
import Rect from '../Geometry/Rect';
import { Icon } from 'antd';

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
          <Icon type="folder" onClick={this.showActionFlow} />
          <Icon type="delete" />
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
