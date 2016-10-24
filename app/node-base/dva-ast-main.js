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
  namespace: '',
  services: {
    'project.loadAll': ({ ipc }, { event, payload }) => {
      console.log('[INFO] Start load all');
      const { sourcePath } = payload;
      const result = api.default('project.loadAll', { sourcePath });
      mergeProject(sourcePath, result, /*isReplace*/true);
      const { BrowserWindow } = require('electron');
      const focusedWindow = BrowserWindow.getAllWindows()[0];
      console.log(sourcePath, result);
      if (focusedWindow) focusedWindow.webContents.send('request', 'replaceState', combine.default(projects[sourcePath]));
    }
  }
}
