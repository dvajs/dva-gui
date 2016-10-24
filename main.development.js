const { app, ipcMain: ipc } = require('electron');
const { join, resolve } = require('path');
const electronDebug = require('electron-debug');
const path = require('path');
const { api, combine } = require('dva-ast');
const { setupEnviroment, setupApplication, setupCommonder } = require('./app/node-base/enviroment');
const commonder = require('./app/commond-register');
const ipcHelper = require('./app/ipc-helper')('node');
const CHANNEL = 'dva-ast-api';
const projects = {};
const home = path.resolve('.');
function mergeProject(sourcePath, data, isReplace) {
  if (isReplace) {
    projects[sourcePath] = data;
  } else {
    projects[sourcePath] = Object.assign(projects[sourcePath] || {}, data);
  }
}

function removeAstFromProject(sourcePath, filePath) {
  delete projects[sourcePath][filePath];
}
setupCommonder();
setupEnviroment();
setupApplication();

if (process.env.env === 'dev') {
  electronDebug();
}

function createWindow() {
  commonder.dispatch('application:new-window', `file://${__dirname}/dist/index.html`);
}

app.on('ready', () => {
  commonder.dispatch('application:update-menu', 'default');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    commonder.dispatch('application:quit');
  }
});

app.on('quit', () => {
  commonder.dispatch('application:save-config');
});

app.on('activate', () => {
  if (cygnus.application.context.sizeOfWindows > 0) return;
  commonder.dispatch('application:new-window', `file://${__dirname}/dist/index.html`);
});

ipcHelper.onCommonder();
