import React, { PropTypes } from 'react';
import { Button, Icon } from 'antd';
import { createContainer } from 'rc-fringing';
import { connect } from 'dva';
import {
  modelsSelector,
  componentsSelector,
  actionsGroupByModelsSelector,
  ghostedActionRelationsSelector,
} from '../selectors/dva';

import Paper from '../components/Geometry/Paper';
import ModelGroup from '../components/Nodes/ModelGroup';
import ComponentGroup from '../components/Nodes/ComponentGroup';
import ActionFlowGroup from '../components/Nodes/ActionFlowGroup';

class DataFlowDetailPanel extends React.Component {
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
      x: opts.left + opts.indent * 1,
      y: opts.top + 100,
      indent: opts.indent,
      rowHeight: opts.rowHeight,
    };

    coordinates.modelGroup = {
      x: opts.left + opts.indent * 4,
      y: opts.top,
    };

    return coordinates;
  }
  calcConnections() {
    const connections = [];
    const { ghostedActionRelations, models } = this.props;
    Object.keys(ghostedActionRelations).forEach(action => {
      const relation = ghostedActionRelations[action];
      if (relation.fromSubscription) {
        connections.push({
          from: { id: relation.fromSubscription.id, point: 'l' },
          to: { id: action, point: 't' },
        });
      }

      if (relation.fromComponent) {
        connections.push({
          from: { id: relation.fromComponent.id, point: 'r' },
          to: { id: action, point: 'l' },
        });
      }

      if (relation.fromEffect) {
        connections.push({
          from: { id: relation.fromEffect.id, point: 'r' },
          to: { id: action, point: 'l' },
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

    models.forEach(model => {
      model.reducers.forEach(reducer => {
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
      routeComponents,
      actionsGroupByModels,
      ghostedActionRelations,
    } = this.props;
    if (!models) return null;

    const DataFlowDetailPaper = this.drawPaper();
    const coordinates = this.calcCoordinates();
    const connections = this.calcConnections();
    return (
      <div>
        <Button
          type="ghost"
          className="btn-primary-ghost"
          style={{ position: 'fixed', top: 40, zIndex: 1000 }}
          onClick={() => { this.context.router.push('/graph/dataflow/'); }}
        >
          <Icon type="left" /> Back
        </Button>
        <DataFlowDetailPaper
          connections={connections}
        >
          <ModelGroup
            coordinates={coordinates.modelGroup}
            models={models}
          />
          <ComponentGroup
            coordinates={coordinates.componentGroup}
            components={routeComponents}
          />
          <ActionFlowGroup
            coordinates={coordinates.actionFlowGroup}
            models={models}
            actionRelations={ghostedActionRelations}
            actionsGroupByModels={actionsGroupByModels}
          />
        </DataFlowDetailPaper>
      </div>
    );
  }
}

DataFlowDetailPanel.propTypes = {
  models: PropTypes.array,
  routeComponents: PropTypes.array,
  actionsGroupByModels: PropTypes.object,
  ghostedActionRelations: PropTypes.object,
};

DataFlowDetailPanel.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    models: modelsSelector(state),
    routeComponents: componentsSelector(state),
    actionsGroupByModels: actionsGroupByModelsSelector(state),
    ghostedActionRelations: ghostedActionRelationsSelector(state),
  })
)(DataFlowDetailPanel);
