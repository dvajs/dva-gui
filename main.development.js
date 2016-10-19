const { app, ipcMain: ipc } = require('electron');
const window = require('electron-window');
const { join, resolve } = require('path');
const { api, combine } = require('dva-ast');

const CHANNEL = 'ipc';

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

let mainWindow;
const windowOptions = {
  width: 1000,
  height: 572,
};

function createProject(sourcePath) {
  mainWindow = window.createWindow(windowOptions);
  mainWindow.webContents.openDevTools();
  const filePath = resolve(__dirname, 'index.html');
  mainWindow.showUrl(filePath, { sourcePath });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    // create main window
  }
});
app.on('ready', () => {
  createProject(join(__dirname, 'examples/count'));
});

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
