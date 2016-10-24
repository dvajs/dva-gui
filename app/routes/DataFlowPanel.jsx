import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { createContainer } from 'rc-fringing';
import {
  modelByIdsSelector,
  modelsGroupByComponentsSelector,
  componentByIdsSelector,
} from '../selectors/dva';

import Paper from '../components/Geometry/Paper';
import DataFlowSideBar from '../components/UI/DataFlowSideBar';
import ModelGroup from '../components/Nodes/ModelGroup';
import ComponentGroup from '../components/Nodes/ComponentGroup';
import StateGroup from '../components/Nodes/StateGroup';
import ComponentCreateModal from '../components/UI/ComponentCreateModal';
import ModelCreateModal from '../components/UI/ModelCreateModal';


class DataFlowPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  onActiveNodesChange = (nodes) => {
    const activeNodeId = nodes.length ? nodes[0].id : null;
    this.setState({
      activeNodeId,
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
    Object.keys(modelsGroupByComponents).forEach(componentId => {
      modelsGroupByComponents[componentId].forEach(modelId => {
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
    const { models, routeComponents, dataflow } = this.props;
    if (!models.data) return null; // TODO: 这段判断不合理
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
          />
        </DataFlowPaper>
        <DataFlowSideBar
          activeNodeId={this.state.activeNodeId}
          models={models}
          routeComponents={routeComponents}
        />
        <ComponentCreateModal />
        <ModelCreateModal />
      </div>
    );
  }
}

DataFlowPanel.propTypes = {
  dispatch: PropTypes.func,
  dataflow: PropTypes.object,
  models: PropTypes.object.isRequired,
  modelByIds: PropTypes.object,
  routeComponents: PropTypes.array.isRequired,
  modelsGroupByComponents: PropTypes.object.isRequired,
  componentByIds: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    dataflow: state.dataflow,
    models: state['dva.models'],
    modelByIds: modelByIdsSelector(state),
    routeComponents: state['dva.routeComponents'],
    modelsGroupByComponents: modelsGroupByComponentsSelector(state),
    componentByIds: componentByIdsSelector(state),
  })
)(DataFlowPanel);
