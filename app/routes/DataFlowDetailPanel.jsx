import React, { PropTypes } from 'react';
import { createContainer } from 'rc-fringing';
import { connect } from 'dva';
import {
  modelsSelector,
  componentsSelector,
  actionsGroupByModelsSelector,
  actionRelationsSelector,
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
      top: 0,
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
    const { actionRelations, models } = this.props;
    Object.keys(actionRelations).forEach(action => {
      const relation = actionRelations[action];
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
        height: 1000,
      })(Paper);
    }
    return this.Paper;
  }
  render() {
    const { models, routeComponents, actionsGroupByModels, actionRelations } = this.props;
    if (!models) return null;

    const DataFlowDetailPaper = this.drawPaper();
    const coordinates = this.calcCoordinates();
    const connections = this.calcConnections();
    return (
      <div>
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
            actionRelations={actionRelations}
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
  actionRelations: PropTypes.object,
  actionsGroupByModels: PropTypes.object,
};

export default connect(
  (state) => ({
    models: modelsSelector(state),
    routeComponents: componentsSelector(state),
    actionsGroupByModels: actionsGroupByModelsSelector(state),
    actionRelations: actionRelationsSelector(state),
  })
)(DataFlowDetailPanel);
