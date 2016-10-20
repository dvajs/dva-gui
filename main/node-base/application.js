const { Emitter } = require('event-kit');
const CygnusWindow = require('./window');
const { app, ipcMain, Menu, BrowserWindow, dialog } = require('electron');
const ApplicationMenu = require('./application-menu');
const baseMenu = require('../base/base-menu');
const fs = require('fs');
const join = require('path').join;
const workspace = require('../workspace');
const { api, combine } = require('dva-ast');

function mergeProject(sourcePath, data, isReplace) {
  if (isReplace) {
    projects[sourcePath] = data;
  } else {
    projects[sourcePath] = Object.assign(projects[sourcePath] || {}, data);
  }
}


class Application {
  constructor() {
    try {
      this.config = require('../../app.config.json');
    } catch (err) {
      this.config = {
        "window": {
          "width": 800,
          "height": 600,
          "x": 0,
          "y": 0
        }
      }
    }

    this.emitter = new Emitter();
    this.core = new Emitter();
    this.windows = [];
    this.menus = {};

    this.saveConfig.bind(this);
    this.pushMenuByName.bind(this);
    this.setCurrentMenu.bind(this);
    this.registerBaseEvents.bind(this);
  }

  initialize() {
    this.pushMenuByName('default', baseMenu);
    this.registerBaseEvents();
  }

  get eventNames() {
    return this.emitter.getEventNames();
  }

  get sizeOfWindows() {
    return this.windows.length;
  }

  openWindow(options) {
    if (typeof options === 'string') {
      const loadSetting = Object.assign({}, this.config.window);
      loadSetting.path = options;
      return new CygnusWindow(this, loadSetting);
    }
    return new CygnusWindow(this, options);
  }
  addWindow(win) {
    this.push(win);
  }
  delWindow(win) {
    this.windows.slice(win.uniqueId - 1, 1);
  }

  pushMenuByName(name, template) {
    const menu = new ApplicationMenu(template);
    this.menus[name] = menu;
  }
  setCurrentMenu(name) {
    Menu.setApplicationMenu(this.menus[name].builded);
  }

  saveConfig() {
    if (this.config) {
      fs.writeFile(`${process.env.HOME}/app.config.json`, JSON.stringify(this.config));
    }
  }

  openFile() {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
    }, (dir) => {
      focusedWindow.webContents.send('dva-ast-api', 'replaceState', { sourcePath: dir });
    });
  }
  saveFile() {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    ipcMain.once('application:save-file/response', (e, filename, buffer) => {
      fs.writeFile(filename, buffer);
    });
    focusedWindow.webContents.send('application:save-file');
  }

  registerBaseEvents() {
    const application = this;
    const { emitter } = this;

    emitter.on('application:quit', () => { app.quit(); });
    emitter.on('application:new-window', (options) => { application.openWindow(options); });
    emitter.on('application:save-config', () => { application.saveConfig(); });
    emitter.on('application:fullscreen', (fullOrNot) => { application.setFullScrern(fullOrNot); });
    emitter.on('application:update-menu', (menu) => { application.setCurrentMenu(menu); });
    emitter.on('application:open-file', () => { application.openFile(); });
    emitter.on('application:save-file', () => { application.saveFile(); });
  }
}

const application = new Application();

module.exports = application;
