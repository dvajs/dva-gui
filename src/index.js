import React from 'react';
import dva from 'dva/mobile';
import { ipcRenderer as ipc } from 'electron';
import { parseArgs } from 'electron-window/lib/renderer';
import App from './routes/App';
import { message } from 'antd';

const ipcMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type === 'ipc') {
    ipc.send('ipc', 'action', action.payload);
  }
  return next(action);
};

const app = dva({
  onAction: [ipcMiddleware],
});
app.router(_ => <App />);
app.start('#root');

ipc.on('ipc', (event, type, payload) => {
  console.log('received', type, payload);
});

ipc.send('ipc', 'init', 1);

parseArgs();
message.error(window.__args__.sourcePath);
