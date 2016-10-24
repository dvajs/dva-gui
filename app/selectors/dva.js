import { createSelector } from 'reselect';

export const modelsSelector = state => (state['dva.models'].data || []);
export const dispatchesSelector = state => state['dva.dispatches'];
export const componentsSelector = state => state['dva.routeComponents'];
export const routerSelector = state => state['dva.router'];

// byIds
export const componentByIdsSelector = createSelector(
  componentsSelector,
  components => components.reduce(
    (prev, curr) => ({ ...prev, [curr.id]: curr }),
    {},
  )
);
export const modelByIdsSelector = createSelector(
  modelsSelector,
  models => models.reduce(
    (prev, curr) => ({ ...prev, [curr.id]: curr }),
    {},
  )
);
export const effectByIdsSelector = state => state['dva.models'].effectByIds;
export const reducerByIdsSelector = state => state['dva.models'].reducerByIds;
export const subscriptionByIdsSelector = state => state['dva.models'].subscriptionByIds;

// relations
/*
  filter all actions that:
    - dispatched from subscriptions or
    - watched by effects or dispatched from reducers
    - handled by reducers
  and return a map { [action]: { modelId } }
*/
export const actionRelationsSelector = createSelector(
  [
    dispatchesSelector,
    modelsSelector,
    effectByIdsSelector,
    reducerByIdsSelector,
    subscriptionByIdsSelector,
    componentByIdsSelector,
  ],
  (dispatches, models, effectByIds, reducerByIds, subscriptionByIds, componentByIds) => {
    const map = {};
    const actions = Object.keys(dispatches);
    actions.forEach(action => {
      const { input = [], output = [] } = dispatches[action];
      map[action] = map[action] || { input, output };

      output.forEach(id => {
        map[action].toEffect = effectByIds[id];
        map[action].toReducer = reducerByIds[id];
        const { modelId } = effectByIds[id] || reducerByIds[id] || {};
        if (modelId) {
          map[action].modelId = modelId;
        }
      });
      input.forEach(id => {
        map[action].fromSubscription = subscriptionByIds[id];
        map[action].fromEffect = effectByIds[id];
        map[action].fromComponent = componentByIds[id];
        const { modelId } = effectByIds[id] || subscriptionByIds[id] || {};
        if (modelId) {
          map[action].modelId = modelId;
        }
      });
    });
    return map;
  },
);

/*
  filter all actions that:
    - dispatched from subscriptions
    - watched by effects
    - handled by reducers
  and groupBy model ids
*/
export const actionsGroupByModelsSelector = createSelector(
  [
    dispatchesSelector,
    actionRelationsSelector,
  ],
  (dispatches, actionsWithModelId) => {
    const map = {};
    const actions = Object.keys(dispatches);
    actions.forEach(action => {
      const { modelId } = actionsWithModelId[action] || {};
      if (modelId) {
        map[modelId] = map[modelId] || [];
        map[modelId].push(action);
      }
    });

    return map;
  },
);

// models groupBy components
export const modelsGroupByComponentsSelector = createSelector(
  [componentsSelector, actionRelationsSelector],
  (components = [], actionsWithModelId) => components.map(comp => {
    const { dispatches, id } = comp;
    const map = {};
    dispatches.forEach(action => {
      const { modelId } = actionsWithModelId[action] || {};
      if (modelId) {
        map[modelId] = true;
      }
    });
    return {
      [id]: Object.keys(map),
    };
  }).reduce((prev, curr) => ({ ...prev, ...curr }), {}),
);
