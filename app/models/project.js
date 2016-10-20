export default {
  namespace: 'project',
  state: {},
  subscriptions: {},
  reducers: {
    ['sync'](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
