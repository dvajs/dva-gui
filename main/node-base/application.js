const CygnusWindow = require('./window');
const { app, ipcMain, Menu, BrowserWindow, dialog } = require('electron');
const ApplicationMenu = require('./application-menu');
const baseMenu = require('../base/base-menu');
const fs = require('fs');
const join = require('path').join;
const workspace = require('../workspace');
const { api, combine } = require('dva-ast');

const projects = {};
function mergeProject(sourcePath, data, isReplace) {
  if (isReplace) {
    projects[sourcePath] = data;
  } else {
    projects[sourcePath] = Object.assign(projects[sourcePath] || {}, data);
  }
}

module.exports = {
  namespace: 'application',
  context: {
    windows: [],
    menus: {},
    config: {},
    sizeOfWindows: 0,
  },
  initialize: (ctx) => {
    const menu = new ApplicationMenu(baseMenu);
    ctx.menus['default'] = menu;
    try {
      ctx.config = require('../../app.config.json');
    } catch (err) {
      ctx.config = {"window": { "width": 800, "height": 600, "x": 0, "y": 0 }};
    }
  },
  services: {
    'application:quit': () => {
      app.quit();
    },
    'application:new-window': (ctx, options) => {
      if (typeof options === 'string') {
        const loadSetting = Object.assign({}, ctx.config.window);
        ctx.sizeOfWindows++;
        loadSetting.path = options;
        return new CygnusWindow(ctx, loadSetting);
      }
      return new CygnusWindow(ctx, options);
    },
    'application:push-menu-by-name': (ctx, { name, template }) => {
      const menu = new ApplicationMenu(template);
      ctx.menus[name] = menu;
    },
    'application:update-menu': (ctx, name) => {
      Menu.setApplicationMenu(ctx.menus[name].builded);
    },
    'application:save-config': (ctx) => {
      if (ctx.config) {
        fs.writeFile(`${process.env.HOME}/app.config.json`, JSON.stringify(ctx.config));
      }
    },
    'application:open-file': () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
      }, (dir) => {
        const result = api.default('project.loadAll', { sourcePath: dir[0] });
        mergeProject(dir[0], result, /*isReplace*/true);
        focusedWindow.webContents.send('request', 'replaceState', combine.default(projects[dir[0]]));
      });
    }
  }
}
