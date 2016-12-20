import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { createContainer } from 'rc-fringing';
import {
  modelByIdsSelector,
  modelsGroupByComponentsSelector,
  componentByIdsSelector,
} from '../selectors/dva';

import Paper from '../components/Geometry/Paper';
import ModelGroup from '../components/Nodes/ModelGroup';
import ComponentGroup from '../components/Nodes/ComponentGroup';
import StateGroup from '../components/Nodes/StateGroup';
import ComponentCreateModal from '../components/UI/ComponentCreateModal';
import ComponentDispatchModal from '../components/UI/ComponentDispatchModal';
import ModelCreateModal from '../components/UI/ModelCreateModal';
import Sidebar from '../components/UI/Sidebar';
import ComponentForm from '../components/UI/ComponentForm';
import ModelForm from '../components/UI/ModelForm';


class DataFlowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onActiveNodesChange = (nodes) => {
    const activeNode = nodes.length ? nodes[0] : null;
    this.setState({
      activeNode,
    });
  }
  calcCoordinates() {
    const width = 800;
    const stateCoordinates = {
      x: width / 2.5,
      y: 0,
    };
    const componentCoordinates = {
      x: stateCoordinates.x - 250,
      y: stateCoordinates.y + 120,
    };
    const modelCoordinates = {
      x: stateCoordinates.x + 250 + 30,
      y: stateCoordinates.y + 120,
    };
    return {
      state: stateCoordinates,
      component: componentCoordinates,
      model: modelCoordinates,
    };
  }
  analyzeConnections() {
    const connections = [];
    connections.push({
      from: { id: 'StateGroup.Content', point: 'l' },
      to: { id: 'ComponentGroup.Label', point: 't' },
    });
    connections.push({
      from: { id: 'ModelGroup.Label', point: 't' },
      to: { id: 'StateGroup.Content', point: 'r' },
    });

    const { modelsGroupByComponents } = this.props;
    Object.keys(modelsGroupByComponents).forEach((componentId) => {
      modelsGroupByComponents[componentId].forEach((modelId) => {
        connections.push({
          from: { id: componentId, point: 'r' },
          to: { id: modelId, point: 'l' },
        });
      });
    });
    return connections;
  }
  drawPaper() {
    if (!this.Paper) {
      this.Paper = createContainer({
        width: 1000,
        height: 1000,
      })(Paper);
    }
    return this.Paper;
  }
  showActionFlow = () => {
    this.props.dispatch({
      type: 'dataflow/showActionFlow',
      payload: {},
    });
  }
  hideActionFlow = () => {
    this.props.dispatch({
      type: 'dataflow/hideActionFlow',
      payload: {},
    });
  }
  removeComponent = (id) => {
    const comp = this.props.componentByIds[id];
    this.props.dispatch({
      type: 'ipc',
      method: 'routeComponents.remove',
      payload: {
        filePath: comp.filePath,
      },
    });
  }
  showComponentCreateModal = () => {
    this.props.dispatch({
      type: 'dataflow/showComponentCreateModal',
      payload: {},
    });
  }
  showComponentDispatchModal = () => {
    this.props.dispatch({
      type: 'dataflow/showComponentDispatchModal',
      payload: {},
    });
  }
  showModelCreateModal = () => {
    this.props.dispatch({
      type: 'dataflow/showModelCreateModal',
      payload: {},
    });
  }
  removeModel = (id) => {
    const m = this.props.modelByIds[id];
    this.props.dispatch({
      type: 'ipc',
      method: 'models.remove',
      payload: {
        filePath: m.filePath,
      },
    });
  }
  render() {
    const { models, routeComponents, modelByIds, componentByIds } = this.props;
    if (!models.data) return null; // TODO: 这段判断不合理
    const { activeNode = {} } = this.state;
    const coordinates = this.calcCoordinates();
    const connections = this.analyzeConnections();
    const DataFlowPaper = this.drawPaper();
    return (
      <div>
        <DataFlowPaper
          connections={connections}
          onActiveNodesChange={this.onActiveNodesChange}
        >
          <StateGroup coordinates={coordinates.state} />
          <ModelGroup
            coordinates={coordinates.model}
            models={models.data || []}
            removeModel={this.removeModel}
            showModelCreateModal={this.showModelCreateModal}
          />
          <ComponentGroup
            coordinates={coordinates.component}
            components={routeComponents}
            removeComponent={this.removeComponent}
            showComponentCreateModal={this.showComponentCreateModal}
            showComponentDispatchModal={this.showComponentDispatchModal}
          />
        </DataFlowPaper>
        <Sidebar visible={!!activeNode.id}>
          {
            activeNode.type === 'Component' ?
              <ComponentForm component={componentByIds[activeNode.id]} /> :
              null
          }
          {
            activeNode.type === 'Model' ?
              <ModelForm model={modelByIds[activeNode.id]} models={models} /> :
              null
          }
        </Sidebar>
        <ComponentCreateModal />
        <ComponentDispatchModal
          activeNodeId={this.state.activeNode ? this.state.activeNode.id : null}
        />
        <ModelCreateModal />
      </div>
    );
  }
}

DataFlowPanel.propTypes = {
  dispatch: PropTypes.func,
  models: PropTypes.object.isRequired,
  modelByIds: PropTypes.object,
  routeComponents: PropTypes.array.isRequired,
  modelsGroupByComponents: PropTypes.object.isRequired,
  componentByIds: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    models: state['dva.models'],
    modelByIds: modelByIdsSelector(state),
    routeComponents: state['dva.routeComponents'],
    modelsGroupByComponents: modelsGroupByComponentsSelector(state),
    componentByIds: componentByIdsSelector(state),
  })
)(DataFlowPanel);
