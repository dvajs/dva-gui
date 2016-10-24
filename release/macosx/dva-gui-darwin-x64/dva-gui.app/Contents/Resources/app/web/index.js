import { ipcRenderer as ipc } from 'electron';
import path from 'path';

const CHANNEL = 'request';
const projectInfos = {};
const ipcHelper = require('../app/ipc-helper')('');

import dva from 'dva';
import project from './models/project';
import dvaDispatches from './models/dva.dispatches';
import dvaModels from './models/dva.models';
import dvaRouteComponents from './models/dva.routeComponents';
import dvaRouter from './models/dva.router';
import dataflow from './models/dataflow';
import router from './router.jsx';
import { message, notification } from 'antd';
import './index.less';
import './index.html';

function assert(check, msg) {
  if (!check) {
    message.error(msg);
  }
}

function ipcMiddleware() {
  return next => (action) => {
    console.info('[ACTION]: ', action.type, action.payload);
    if (action.type === 'ipc') {
      console.info('[IPC]: ', action.method);
      assert(action.method, 'ipcMiddleware: action should have method property');
      ipcHelper.send(action.method, {
        sourcePath: projectInfos.sourcePath,
        ...action.paylaod,
      })
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
          ['dva.dispatches']: action.payload.dispatches,
          ['dva.models']: action.payload.models,
          ['dva.routeComponents']: action.payload.routeComponents,
          ['dva.router']: action.payload.router,
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
window.__app = app;

ipc.on(CHANNEL, (event, { action, payload }) => {
  console.info(action)
  switch (action) {
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

if (process.env.env === 'dev') {
  const appLocation = './app';            // ./examples/count
  projectInfos.sourcePath = path.resolve(appLocation);

  app._store.dispatch({ type: 'project/sync', payload: projectInfos });
  app._store.dispatch({ type: 'ipc', method: 'project.loadAll' });
}
