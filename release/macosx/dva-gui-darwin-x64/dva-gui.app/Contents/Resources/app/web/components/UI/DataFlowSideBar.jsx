import React, { PropTypes } from 'react';
import ComponentForm from './ComponentForm';
import ModelForm from './ModelForm';

const style = {
  display: 'none',
};

class DataFlowSideBar extends React.Component {
  getActiveNodeData() {
    const { activeNodeId, models, routeComponents } = this.props;
    const model = models.data.find(m => m.id === activeNodeId);
    if (model) return { type: 'model', node: model };

    const comp = routeComponents.find(c => c.id === activeNodeId);
    if (comp) return { type: 'component', node: comp };

    return null;
  }
  render() {
    const node = this.getActiveNodeData();
    return (
      <div className="dataflow-sidebar" style={{ ...style, display: node ? 'block' : 'none' }}>
        { node && node.type === 'component' ? <ComponentForm component={node.node} /> : null }
        {
          node && node.type === 'model' ?
          <ModelForm model={node.node} models={this.props.models} /> :
          null
        }
      </div>
    );
  }
}


DataFlowSideBar.propTypes = {
  activeNodeId: PropTypes.string,
  models: PropTypes.object,
  routeComponents: PropTypes.array,
};
export default DataFlowSideBar;
