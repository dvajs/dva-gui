const { app } = require('electron');
const ipcHelper = require('./src/utils/ipc-helper')('node');
const { bootstrap } = require('./src/enviroment');

// bootstrap enviroment settings
bootstrap();

process.env.HOME = __dirname;
if (process.env.env === 'dev') {
  require('electron-debug')();
}

const { cygnus } = global;
const { commands } = cygnus;

function createWindow() {
  commands.dispatch('application:new-window', process.env.env === 'dev' ? `file://${__dirname}/../web/src/index.html` : `file://${__dirname}/index.html`);
}

app.on('ready', () => {
  commands.dispatch('application:update-menu', 'default');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    commands.dispatch('application:quit');
  }
});

app.on('quit', () => {
  commands.dispatch('application:save-config');
});

app.on('activate', () => {
  if (cygnus.application.context.sizeOfWindows > 0) return;
  commands.dispatch('application:new-window', process.env.env === 'dev' ? `file://${__dirname}/../web/src/index.html` : `file://${__dirname}/index.html`);
});

ipcHelper.onCommand();
