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
    this.ipc.on('request', (event, { action, payload }) => {
      commonder.dispatch(action, { event, payload });
    })
  }

  onRequest(callback) {
    this.ipc.on('request', (event, { action, payload }) => {
      callback({ type: action, event, payload });
    })
  }

  push(action, payload) {
    const { BrowserWindow } = require('electron');
    const focusedWindow = BrowserWindow.getFocusedWindow();
    focusedWindow.webContents.send('request', { action, payload });
  }

  send(action, payload) {
    this.ipc.send('request', { action, payload });
  }
}

module.exports = (type) => {
  return new IpcHelper(type);
}