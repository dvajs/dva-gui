const { app, ipcMain: ipc } = require('electron');
const window = require('electron-window');
const { join, resolve } = require('path');

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

ipc.on('ipc', (event, type, payload) => {
  event.sender.send('ipc', type + 1, payload + 1);
});
