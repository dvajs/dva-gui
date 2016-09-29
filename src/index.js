import React from 'react';
import dva from 'dva';
import { ipcRenderer as ipc } from 'electron';
import App from './routes/App';

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

