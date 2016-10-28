import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Icon, Tooltip, Popconfirm } from 'antd';
import Rect from '../Geometry/Rect';


class ModelNode extends React.Component {
  showActionFlow = () => {
    const nodeId = encodeURIComponent(this.props.data.id);
    this.context.router.push(`/graph/dataflow/${nodeId}`);
  }
  render() {
    const { noDetailLink, data } = this.props;
    return (
      <Rect className="node-model" data={{ ...data, type: 'Model' }}>
        { this.props.children }
        <div className="node-icons">
          {
            noDetailLink ?
              null :
                <Tooltip placement="top" title={'show detail action flow'}>
                  <Icon type="folder" onClick={this.showActionFlow} />
                </Tooltip>
          }
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
      </Rect>
    );
  }
}

ModelNode.propTypes = {
  data: PropTypes.object,
  children: PropTypes.any,
  removeModel: PropTypes.func,
  noDetailLink: PropTypes.bool,
};

ModelNode.contextTypes = {
  router: PropTypes.object,
};
export default connect(({ dataflow }) => ({ dataflow }))(ModelNode);
