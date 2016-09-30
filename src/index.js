import React from 'react';
import dva from 'dva/mobile';
import { ipcRenderer as ipc } from 'electron';
import { parseArgs } from 'electron-window/lib/renderer';
import App from './routes/App';
import { message } from 'antd';

// models
import dispatches from './models/dispatches';
import models from './models/models';
import routeComponents from './models/routeComponents';
import router from './models/router';

const CHANNEL = 'ipc';

parseArgs();
const { sourcePath } = window.__args__;

function assert(check, msg) {
  if (!check) {
    message.error(msg);
  }
}

function ipcMiddleware({ dispatch, getState }) {
  return next => action => {
    if (action.type === 'ipc') {
      assert(action.method, 'ipcMiddleware: action should have method property');
      ipc.send(CHANNEL, action.method, { ...action.payload, sourcePath });
    }
    return next(action);
  };
}

function repalceStateReducerEnhancer(reducer) {
  return (state, action) => {
    if (action.type === 'replaceState') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const app = dva({
  onAction: ipcMiddleware,
  onReducer: repalceStateReducerEnhancer,
});
app.model(dispatches);
app.model(models);
app.model(routeComponents);
app.model(router);
app.router(_ => <App />);
app.start('#root');

ipc.on(CHANNEL, (event, type, payload) => {
  switch (type) {
    case 'replaceState':
      app._store.dispatch({ type, payload });
      console.log(app._store.getState());
      return;
    case 'error':
      message.error(payload);
      return;
    default:
      assert(false, `caught type: ${type}`);
  }
});

// Load project when window is created.
ipc.send(CHANNEL, 'project.loadAll', { sourcePath });
