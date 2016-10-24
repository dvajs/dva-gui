export default {
  namespace: 'dataflow',
  state: {"hello":123, "loading": true},
  subscriptions: {},
  effects: {
    *'showSubscriptionModal'({ payload }, { put }) {
      yield put({
        type: 'ssssssss',
        payload,
      });
      yield put({
        type: 'lalalalala',
        payload,
      });
    },
  },
  reducers: {
    ['lalalalala']: state => state,

    ['showSubscriptionModal']: (state) => (
      { ...state, showSubscriptionModal: true }
    ),

    ['hideSubscriptionModal']: (state) => (
      { ...state, showSubscriptionModal: false }
    ),

    ['showEffectModal']: (state) => (
      { ...state, showEffectModal: true }
    ),

    ['hideEffectModal']: (state) => (
      { ...state, showEffectModal: false }
    ),

    ['showReducerModal']: (state) => (
      { ...state, showReducerModal: true }
    ),

    ['hideReducerModal']: (state) => (
      { ...state, showReducerModal: false }
    ),

    ['testssss']: (state) => {
      console.log('===');
      return state;
    },

    ['showActionFlow']: (state) => {
      console.info('=====');
      return { ...state, showActionFlow: true };
    },

    hideActionFlow: (state) => {
      console.info('=====');
      return { ...state, showActionFlow: false };
    },

    showComponentCreateModal: (state) => {
      return { ...state, showComponentCreateModal: true }
    },

    hideComponentCreateModal: (state) => ({ ...state, showComponentCreateModal: false }),

    showModelCreateModal: state => ({ ...state, showModelCreateModal: true }),
    hideModelCreateModal: state => ({ ...state, showModelCreateModal: false }),
  },
};
