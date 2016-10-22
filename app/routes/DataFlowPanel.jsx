import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {
  modelsGroupByComponentsSelector,
  componentByIdsSelector,
} from '../selectors/dva';
import { createContainer } from 'rc-fringing';
import { Modal } from 'antd';
import Paper from '../components/Geometry/Paper';
import DataFlowSideBar from '../components/UI/DataFlowSideBar';
import ModelGroup from '../components/Nodes/ModelGroup';
import ComponentGroup from '../components/Nodes/ComponentGroup';
import StateGroup from '../components/Nodes/StateGroup';
import DataFlowDetailPanel from './DataFlowDetailPanel';


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
    const width = 1000;
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
  render() {
    const { models, routeComponents, dataflow } = this.props;
    if (!models.data) return null;

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
          <ModelGroup coordinates={coordinates.model} models={models.data} />
          <ComponentGroup
            coordinates={coordinates.component}
            components={routeComponents}
            removeComponent={this.removeComponent}
          />
        </DataFlowPaper>
        <DataFlowSideBar
          activeNodeId={this.state.activeNodeId}
          models={models}
          routeComponents={routeComponents}
        />
        <Modal
          title="Data Flow Details"
          wrapClassName="dataflow-modal"
          width="90%"
          visible={dataflow.showActionFlow}
          okText="Confrim" cancelText="Cancel"
          onOk={this.handleOk}
          onCancel={this.hideActionFlow}
          footer={null}
          maskClosable={false}
        >
          <DataFlowDetailPanel />
        </Modal>
      </div>
    );
  }
}

DataFlowPanel.propTypes = {
  dispatch: PropTypes.func,
  dataflow: PropTypes.object,
  dispatches: PropTypes.object.isRequired,
  models: PropTypes.object.isRequired,
  routeComponents: PropTypes.array.isRequired,
  modelsGroupByComponents: PropTypes.object.isRequired,
  componentByIds: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    dataflow: state.dataflow,
    dispatches: state['dva.dispatches'],
    models: state['dva.models'],
    routeComponents: state['dva.routeComponents'],
    modelsGroupByComponents: modelsGroupByComponentsSelector(state),
    componentByIds: componentByIdsSelector(state),
  })
)(DataFlowPanel);
