import React from 'react';
import dva from 'dva/mobile';
import { ipcRenderer as ipc } from 'electron';
import { parseArgs } from 'electron-window/lib/renderer';
import App from './routes/App';
import { message } from 'antd';

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
      ipc.send('ipc', action.method, { ...action.payload, sourcePath });
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
app.router(_ => <App />);
app.start('#root');

ipc.on('ipc', (event, type, payload) => {
  console.log('received', type, payload);
});

ipc.send('ipc', 'init', 1);
