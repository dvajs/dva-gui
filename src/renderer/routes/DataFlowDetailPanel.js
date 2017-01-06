import React, { PropTypes } from 'react';
import { Button, Icon } from 'antd';
import { createContainer } from 'rc-fringing';
import { connect } from 'dva';
import {
  modelsSelector,
  modelByIdsSelector,
  componentsSelector,
  componentByIdsSelector,
  actionsGroupByModelsSelector,
  actionRelationsSelector,
  modelsGroupByComponentsSelector,
} from '../selectors/dva';

import Paper from '../components/Geometry/Paper';
import ModelGroup from '../components/Nodes/ModelGroup';
import ComponentGroup from '../components/Nodes/ComponentGroup';
import ComponentSourceModal from '../components/UI/ComponentSourceModal';
import ActionFlowGroup from '../components/Nodes/ActionFlowGroup';

class DataFlowDetailPanel extends React.Component {
  showComponentSource = (comp) => {
    this.props.dispatch({
      type: 'dataflow/showComponentSource',
      payload: comp,
    });
  }
  createEffect = (effect, model) => {
    const { namespace, filePath } = model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.addEffect',
      payload: {
        ...effect,
        namespace,
        filePath,
      },
    });
  }
  updateEffect = (effect, model) => {
    const { filePath, namespace } = model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.updateEffect',
      payload: {
        ...effect,
        namespace,
        filePath,
      },
    });
  }
  createReducer = (reducer, model) => {
    const { namespace, filePath } = model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.addReducer',
      payload: {
        ...reducer,
        namespace,
        filePath,
      },
    });
  }
  updateReducer = (reducer, model) => {
    const { filePath, namespace } = model;
    this.props.dispatch({
      type: 'ipc',
      method: 'models.updateReducer',
      payload: {
        ...reducer,
        namespace,
        filePath,
      },
    });
  }
  calcCoordinates() {
    /*
      from left to right
      components => actions flow => models
    */
    const opts = {
      top: 30,
      left: 50,
      indent: 250,
      rowHeight: 60,
    };

    const coordinates = {};
    // start with top left
    coordinates.componentGroup = {
      x: opts.left,
      y: opts.top,
    };

    // actionFlowGroup next to componentGroup
    coordinates.actionFlowGroup = {
      x: opts.left + (opts.indent * 1),
      y: opts.top + 100,
      indent: opts.indent,
      rowHeight: opts.rowHeight,
    };

    coordinates.modelGroup = {
      x: opts.left + (opts.indent * 4),
      y: opts.top,
    };

    return coordinates;
  }
  calcConnections() {
    const connections = [];
    const { actionRelations, models } = this.props;
    Object.keys(actionRelations).forEach((action) => {
      const relation = actionRelations[action];
      if (relation.fromSubscription) {
        relation.fromSubscription.forEach((sub) => {
          connections.push({
            from: { id: sub.id, point: 'l' },
            to: { id: action, point: 't' },
          });
        });
      }

      if (relation.fromComponent) {
        relation.fromComponent.forEach((comp) => {
          connections.push({
            from: { id: comp.id, point: 'r' },
            to: { id: action, point: 'l' },
          });
        });
      }

      if (relation.fromEffect) {
        relation.fromEffect.forEach((eff) => {
          connections.push({
            from: { id: eff.id, point: 'r' },
            to: { id: action, point: 'l' },
          });
        });
      }

      if (relation.toEffect) {
        connections.push({
          from: { id: action, point: 'r' },
          to: { id: relation.toEffect.id, point: 'l' },
        });
      }

      if (relation.toReducer) {
        connections.push({
          from: { id: action, point: 'r' },
          to: { id: relation.toReducer.id, point: 'l' },
        });
      }

      if (relation.fromEffect && !relation.toReducer) {
        connections.push({
          from: { id: action, point: 'r' },
          to: { id: relation.modelId, point: 'l' },
        });
      }
    });

    models.forEach((model) => {
      model.reducers.forEach((reducer) => {
        connections.push({
          from: { id: reducer, point: 'r' },
          to: { id: model.id, point: 'l' },
        });
      });
    });
    return connections;
  }
  drawPaper() {
    if (!this.Paper) {
      this.Paper = createContainer({
        width: 1200,
        height: 2000,
      })(Paper);
    }
    return this.Paper;
  }
  render() {
    const {
      models,
      modelByIds,
      routeComponents,
      componentByIds,
      actionsGroupByModels,
      actionRelations,
      modelsGroupByComponents,
    } = this.props;
    const {
      createEffect,
      createReducer,
      updateEffect,
      updateReducer,
    } = this;
    const { activeNode } = this.props.params;

    let filteredModels = models;
    let filteredComponents = routeComponents;
    // let filteredComponents = routeComponents;
    if (modelByIds[activeNode]) {
      filteredModels = [modelByIds[activeNode]];

      const filteredComponentsObject = {};
      (actionsGroupByModels[activeNode] || []).forEach((action) => {
        (actionRelations[action].fromComponent || []).forEach((comp) => {
          filteredComponentsObject[comp.id] = comp;
        });
      });

      filteredComponents = Object.keys(filteredComponentsObject)
        .map(key => filteredComponentsObject[key]);
    } else if (componentByIds[activeNode]) {
      filteredComponents = [componentByIds[activeNode]];
      filteredModels = modelsGroupByComponents[activeNode].map(modelId => modelByIds[modelId]);
    }

    const DataFlowDetailPaper = this.drawPaper();
    const coordinates = this.calcCoordinates();
    const connections = this.calcConnections();
    return (
      <div>
        <Button
          type="ghost"
          className="btn-primary-ghost"
          style={{ position: 'fixed', top: 10, zIndex: 1000 }}
          onClick={() => { this.context.router.push('/graph/dataflow/'); }}
        >
          <Icon type="left" /> Back
        </Button>
        <DataFlowDetailPaper
          connections={connections}
        >
          <ModelGroup
            coordinates={coordinates.modelGroup}
            models={filteredModels}
            noCreateLink
            noDetailLink
            noRemoveLink
          />
          <ComponentGroup
            coordinates={coordinates.componentGroup}
            components={filteredComponents}
            showComponentSource={this.showComponentSource}
            noCreateLink
            noDetailLink
            noRemoveLink
          />
          <ActionFlowGroup
            coordinates={coordinates.actionFlowGroup}
            models={filteredModels}
            actionRelations={actionRelations}
            actionsGroupByModels={actionsGroupByModels}
            createEffect={createEffect}
            createReducer={createReducer}
            updateEffect={updateEffect}
            updateReducer={updateReducer}
          />
        </DataFlowDetailPaper>
        <ComponentSourceModal />
      </div>
    );
  }
}

DataFlowDetailPanel.propTypes = {
  params: PropTypes.object,
  models: PropTypes.array,
  modelByIds: PropTypes.object,
  routeComponents: PropTypes.array,
  componentByIds: PropTypes.object,
  actionsGroupByModels: PropTypes.object,
  actionRelations: PropTypes.object,
  modelsGroupByComponents: PropTypes.object,

  dispatch: PropTypes.func,
};

DataFlowDetailPanel.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    models: modelsSelector(state),
    modelByIds: modelByIdsSelector(state),
    routeComponents: componentsSelector(state),
    componentByIds: componentByIdsSelector(state),
    actionsGroupByModels: actionsGroupByModelsSelector(state),
    actionRelations: actionRelationsSelector(state),
    modelsGroupByComponents: modelsGroupByComponentsSelector(state),
  })
)(DataFlowDetailPanel);
