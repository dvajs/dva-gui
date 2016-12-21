import { remote } from 'electron';

const { normalize, sep } = remote.require('path');

export default {
  namespace: 'project',
  state: {
    rootDir: '',
    parentDir: '',
    sourcePath: null,
  },
  subscriptions: {},
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
