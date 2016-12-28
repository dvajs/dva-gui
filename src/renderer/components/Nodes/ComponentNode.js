import React, { PropTypes } from 'react';
import { Icon, Tooltip, Popconfirm } from 'antd';
import Rect from '../Geometry/Rect';


class ComponentNode extends React.Component {
  showActionFlow = () => {
    const nodeId = encodeURIComponent(this.props.data.id);
    this.context.router.push(`/graph/dataflow/${nodeId}`);
  }
  render() {
    const { noDetailLink, noRemoveLink } = this.props;
    return (
      <div>
        <Rect className="node-component" data={{ ...this.props.data, type: 'Component' }}>
          { this.props.children }
          <div className="node-icons">
            <Tooltip placement="top" title={'dispatch a new action'}>
              <Icon type="right-square-o" onClick={this.props.showComponentDispatchModal} />
            </Tooltip>
            <Tooltip placement="top" title={'source code'}>
              <Icon type="code-o" />
            </Tooltip>
            {
              noDetailLink ?
                null :
                <Tooltip placement="top" title={'show detail action flow'}>
                  <Icon type="folder" onClick={this.showActionFlow} />
                </Tooltip>
            }
            {
              noRemoveLink ?
                null :
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
            }
          </div>
        </Rect>
      </div>
    );
  }
}

ComponentNode.propTypes = {
  data: PropTypes.object.isRequired,
  removeComponent: PropTypes.func,
  showComponentDispatchModal: PropTypes.func,
  noDetailLink: PropTypes.bool,
};
ComponentNode.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default ComponentNode;
