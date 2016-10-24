import React, { PropTypes } from 'react';
import ActionNode from './ActionNode';
import EffectNode from './EffectNode';
import ReducerNode from './ReducerNode';

// only from effect
const isOnlyFromEffectNotExist = (relation = {}) =>
  relation.fromEffect
    && !relation.fromComponent
    && !relation.fromSubscription
    && relation.toEffect.ghost;

class ActionFlowGroup extends React.Component {
  getActionNode(action, coordinates) {
    return (
      <ActionNode
        id={action}
        key={action}
        data={{
          ...coordinates,
          id: action,
        }}
      />
    );
  }
  getEffectNode(effect, coordinates) {
    return (
      <EffectNode
        id={effect.id}
        key={effect.id}
        data={{
          ...coordinates,
          id: effect.id,
        }}
        ghost={effect.ghost}
      />
    );
  }
  getReducerNode(reducer, coordinates) {
    return (
      <ReducerNode
        id={reducer.id}
        key={reducer.id}
        data={{
          ...coordinates,
          id: reducer.id,
        }}
        ghost={reducer.ghost}
      />
    );
  }
  draw() {
    const {
      coordinates,
      models,
      actionRelations,
      actionsGroupByModels,
    } = this.props;
    const actionNodes = [];
    const effectNodes = [];
    const reducerNodes = [];

    const { indent, rowHeight, x, y } = coordinates;
    let __y = y;
    models.forEach(model => {
      const actions = (actionsGroupByModels[model.id] || []).sort();
      actions.forEach((action, i) => {
        const relation = actionRelations[action];
        const effectAction = isOnlyFromEffectNotExist(relation);
        if (relation.input.length) {
          actionNodes.push(this.getActionNode(action, {
            x: x + indent * (effectAction ? 1.5 : 0),
            y: __y + rowHeight * i,
          }));
        }

        const { toEffect, toReducer } = relation;
        if (toEffect) {
          effectNodes.push(this.getEffectNode(toEffect, {
            x: x + indent * (effectAction ? 2 : 1),
            y: __y + rowHeight * i,
          }));
        }

        if (toReducer) {
          reducerNodes.push(this.getReducerNode(toReducer, {
            x: x + indent * 2.5,
            y: __y + rowHeight * i,
          }));
        }
      });
      __y = __y + actions.length * rowHeight;
    });

    return actionNodes.concat(effectNodes).concat(reducerNodes);
  }
  render() {
    return (
      <div>
        { this.draw() }
      </div>
    );
  }
}

ActionFlowGroup.propTypes = {
  coordinates: PropTypes.object.isRequired,
  models: PropTypes.array,
  actionRelations: PropTypes.object,
  actionsGroupByModels: PropTypes.object,
};
export default ActionFlowGroup;
