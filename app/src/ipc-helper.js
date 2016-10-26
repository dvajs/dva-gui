const { BrowserWindow } = require('electron');

class IpcHelper {
  constructor(type) {
    if (type === 'node') {
      this.ipc = require('electron').ipcMain;
      this.onCommonder = this.onCommonder.bind(this);
      this.push = this.push.bind(this);
    } else {
      this.ipc = require('electron').ipcRenderer;
      this.onRequest = this.onRequest.bind(this);
      this.send = this.send.bind(this);
    }
  }

  onCommonder() {
    const { commonder } = cygnus;
    this.ipc.on('request', (event, { type, payload }) => {
      commonder.dispatch(type, { event, payload });
    });
  }

  onRequest(callback) {
    this.ipc.on('request', (event, { type, payload }) => {
      callback({ type, event, payload });
    });
  }

  push(type, payload) {
    let focusedWindow = BrowserWindow.getFocusedWindow();
    if (!focusedWindow) {
      focusedWindow = BrowserWindow.getAllWindows()[0];
    }
    focusedWindow.webContents.send('request', { type, payload });
  }

  send(type, payload) {
    this.ipc.send('request', { type, payload });
  }
}

module.exports = type => new IpcHelper(type);
