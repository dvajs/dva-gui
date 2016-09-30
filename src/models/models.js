
export default {
  namespace: 'models',
  state: {
    data: [],
    reducersById: {},
    effectsById: {},
    subscriptionsById: {},
  },
}

export function selector(state, ownProps) {
  const models = state.models;
  return models.data.map(model => {
    return {
      ...model,
      reducers: model.reducers.map(id => models.reducerByIds[id]),
      effects: model.effects.map(id => models.effectByIds[id]),
      subscriptions: model.subscriptions.map(id => models.subscriptionByIds[id]),
    };
  });
}
