import { remote } from 'electron';

const { normalize, sep } = remote.require('path');
const { openProjectByDialog } = remote.getGlobal('services').application;

export default {
  namespace: 'project',
  state: {
    rootDir: '',
    parentDir: '',
    sourcePath: null,
  },
  subscriptions: {
    init() {
      document.title = 'DvaGUI';
    },
  },
  effects: {
    * open({ payload }, { call, put }) {
      const sourcePath = yield call(() => { return openProjectByDialog(); });
      yield put({
        type: 'sync',
        payload: {
          sourcePath,
        },
      });
    },
  },
  reducers: {
    sync(state, { payload }) {
      let rootDir = '';
      let parentDir = '';
      if (payload.sourcePath) {
        const dirarr = normalize(payload.sourcePath).split(sep);
        rootDir = dirarr.pop();
        parentDir = dirarr.join(sep);
      }
      return {
        ...state,
        ...payload,
        rootDir,
        parentDir,
      };
    },
  },
};
