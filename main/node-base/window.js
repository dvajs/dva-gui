const { BrowserWindow } = require('electron');
const { EventEmitter } = require('events');

class CygnusWindow extends EventEmitter {
  constructor(ctx, options) {
    super();

    // while the initilazation is not finished, so we don't show the wnidow.
    options.show = false;

    // Bind this to methods
    this.window = new BrowserWindow(options);
    this.send = this.sendMessage.bind(this);
    this.reload = this.window.reload();
    this.destroy = this.destroy.bind(this);

    // Under dev mode, we need to open dev tools.
    if (process.env.env === 'dev') {
      this.window.webContents.openDevTools();
    }

    // Dispatch the app to all the windows, so we can handle the whhole application
    // in any windows, and when we create a new window, it will be added to application.
    this.ctx = ctx;
    ctx.windows.push(this);
    this.window.loadURL(options.path);
    this.window.uniqueId = ctx.sizeOfWindows - 1;

    this.window.on('ready-to-show', () => {
      this.handleEvent.bind(this)();
      this.window.show();
    });
  }

  set uniqueId(id) {
    this.window.uniqueId = id;
  }
  get uniqueId() {
    return this.window.uniqueId;
  }

  destroy() {
    this.app.delWindow(this.window);
    this.window = null;
  }

  reload() {
    this.window.reload();
  }

  sendMessage(message, payload) {
    const { window } = this;
    window.webContents.send('message', message, payload);
  }

  onMove(e) {
    const position = e.sender.getPosition();
    this.ctx.config.window.x = position[0];
    this.ctx.config.window.y = position[1];
  }

  onResize(e) {
    const size = e.sender.getSize();
    this.ctx.config.window.width = size[0];
    this.ctx.config.window.height = size[1];
  }

  handleEvent() {
    const { window } = this;

    window.on('closed', (e) => { window.destroy(e); });
    window.on('move', this.onMove.bind(this));
    window.on('resize', this.onResize.bind(this));
  }
}

module.exports = CygnusWindow;
