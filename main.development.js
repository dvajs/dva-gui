const { app } = require('electron');
const electronDebug = require('electron-debug');
const { setupEnviroment, setupApplication, setupCommonder } = require('./main/node-base/enviroment');
const commonder = require('./main/commond-register');
const ipcHelper = require('./main/ipc-helper')('node');

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
