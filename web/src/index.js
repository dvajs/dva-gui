import { ipcRenderer as ipc } from 'electron';
import dva from 'dva';
import { message, notification } from 'antd';
import project from './models/project';
import dvaDispatches from './models/dva.dispatches';
import dvaModels from './models/dva.models';
import dvaRouteComponents from './models/dva.routeComponents';
import dvaRouter from './models/dva.router';
import dataflow from './models/dataflow';
import router from './router';
import './index.less';
import './index.html';

const CHANNEL = 'request';
const ipcHelper = require('./utils/ipc-helper')('');

function assert(check, msg) {
  if (!check) {
    message.error(msg);
  }
}

function ipcMiddleware(store) {
  return next => (action) => {
    console.info('[ACTION]: ', action.type, action.payload);
    if (action.type === 'ipc') {
      console.info('[IPC]: ', action.method);
      assert(action.method, 'ipcMiddleware: action should have method property');

      const projectInfos = store.getState().project;
      ipcHelper.send('dva-ast-api', {
        method: action.method,
        sourcePath: projectInfos.sourcePath,
        ...action.payload,
      });
    } else if (action.type === 'ipc-application') {
      ipcHelper.send(action.method, action.payload);
    }
    return next(action);
  };
}

function repalceStateReducerEnhancer(reducer) {
  return (state, action) => {
    if (action.type === 'replaceState') {
      return {
        ...state,
        ...{
          'dva.dispatches': action.payload.dispatches,
          'dva.models': action.payload.models,
          'dva.routeComponents': action.payload.routeComponents,
          'dva.router': action.payload.router,
        },
      };
    }
    return reducer(state, action);
  };
}

const app = dva({
  onAction: ipcMiddleware,
  onReducer: repalceStateReducerEnhancer,
});

app.model(project);
app.model(dvaDispatches);
app.model(dvaModels);
app.model(dvaRouteComponents);
app.model(dvaRouter);
app.model(dataflow);
app.router(router);
app.start(document.getElementById('__reactComponent'));

ipc.on(CHANNEL, (event, { action, payload }) => {
  console.info(action);
  switch (action) {
    case 'project/sync':
      app._store.dispatch({ type: action, payload });
      return;
    case 'replaceState':
      app._store.dispatch({ type: action, payload });
      return;
    case 'error':
      notification.error({
        description: payload,
        duration: 0,
      });
      return;
    default:
      assert(false, `caught action: ${action}`);
  }
});

/*
if (process.env.env === 'dev') {
  const projectInfos = {};
  const appLocation = '../web/examples/count';            // ./examples/count
  projectInfos.sourcePath = require('path').resolve(appLocation);

  app._store.dispatch({ type: 'project/sync', payload: projectInfos });
  app._store.dispatch({ type: 'ipc', method: 'project.loadAll' });
}
*/
