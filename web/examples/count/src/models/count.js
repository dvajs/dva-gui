
export default {
  namespace: 'count',
  state: 0,
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'app/showLoading' });
      dispatch({ type: 'addAsync' });
    },
  },
  reducers: {
    add(state) {
      return state + 1;
    },
  },
  effects: {
    *addAsync(_, { put, call, select }) {
      yield put({ type: 'add' });
    },
  },
}
