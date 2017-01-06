export default {
  namespace: 'dataflow',
  state: { loading: true },
  subscriptions: {},
  effects: {
  },
  reducers: {
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
    showActionFlow: state => ({ ...state, showActionFlow: true }),
    hideActionFlow: state => ({ ...state, showActionFlow: false }),
    showComponentCreateModal: state => ({ ...state, showComponentCreateModal: true }),
    hideComponentCreateModal: state => ({ ...state, showComponentCreateModal: false }),
    showModelCreateModal: state => ({ ...state, showModelCreateModal: true }),
    hideModelCreateModal: state => ({ ...state, showModelCreateModal: false }),
    showComponentDispatchModal: state => ({ ...state, showComponentDispatchModal: true }),
    hideComponentDispatchModal: state => ({ ...state, showComponentDispatchModal: false }),
    showComponentSource: (state, { payload }) => ({
      ...state,
      showComponentSource: true,
      currentComponent: payload,
    }),
    hideComponentSource: state => ({ ...state, showComponentSource: false }),
  },
};
