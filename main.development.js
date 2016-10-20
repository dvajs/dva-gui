const { app, ipcMain: ipc } = require('electron');
const window = require('electron-window');
const { join, resolve } = require('path');
const { api, combine } = require('dva-ast');
const electronDebug = require('electron-debug');
const { setupEnviroment, setupApplication, setupCommonder } = require('./main/node-base/enviroment');
const commonder = require('./main/commond-register');
const ipcHelper = require('./main/ipc-helper')('node');
process.env.HOME = __dirname;
const CHANNEL = 'dva-ast-api';
const projects = {};
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
  commonder.dispatch('application:new-window', `file://${process.env.HOME}/main/base/index.html`);
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
  if (cygnus.application.sizeOfWindows > 0) return;
  commonder.dispatch('application:new-window', `file://${process.env.HOME}/base/index.html`);
});

ipcHelper.onCommonder();

ipc.on(CHANNEL, (event, type, payload) => {
  console.info(`[INFO][${CHANNEL}] received ${type} ${payload}`);
  try {
    const { sourcePath, filePath } = payload;
    const result = api.default(type, payload);

    switch (type) {
      case 'project.loadAll':
        mergeProject(sourcePath, result, /*isReplace*/true);
        event.sender.send(CHANNEL, 'replaceState', combine.default(projects[sourcePath]));
        break;
      case 'models.create':
      case 'models.updateNamespace':
      case 'models.updateState':
      case 'models.addReducer':
      case 'models.updateReducer':
      case 'models.removeReducer':
      case 'models.addEffect':
      case 'models.updateEffect':
      case 'models.removeEffect':
      case 'models.addSubscription':
      case 'models.updateSubscription':
      case 'models.removeSubscription':
        mergeProject(sourcePath, { [filePath]: result });
        event.sender.send(CHANNEL, 'replaceState', combine.default(projects[sourcePath]));
        break;
      case 'models.remove':
        removeAstFromProject(sourcePath, filePath);
        event.sender.send(CHANNEL, 'replaceState', combine.default(projects[sourcePath]));
        break;
      default:
        console.error(`[ERROR][${CHANNEL}] uncaught type ${type}`);
        break;
    }
  } catch(e) {
    console.error(`[ERROR] ${e.message}`);
    console.log(e.stack);
    event.sender.send(CHANNEL, 'error', e.message);
  }
});
