const { app, ipcMain: ipc } = require('electron');
const window = require('electron-window');
const { join, resolve } = require('path');
const { api, combine } = require('dva-ast');

const CHANNEL = 'ipc';

const projects = {};

function mergeProject(sourcePath, data) {
  projects[sourcePath] = Object.assign(projects[sourcePath] || {}, data);
}

let mainWindow;
const windowOptions = {
  width: 1000,
  height: 400,
};

function createProject(sourcePath) {
  mainWindow = window.createWindow(windowOptions);
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
    const { sourcePath } = payload;
    const result = api.default(type, payload);

    switch (type) {
      case 'project.loadAll':
        mergeProject(sourcePath, result);
        const newInfo = combine.default(projects[sourcePath]);
        event.sender.send(CHANNEL, 'replaceState', newInfo);
        break;
      default:
        console.error(`[ERROR][${CHANNEL}] uncaught type ${type}`);
        break;
    }
  } catch(e) {
    console.error(`[ERROR] ${e.message}`);
    event.sender.send(CHANNEL, 'error', e.message);
  }
});
