import { dialog } from 'electron';
import { join } from 'path';
import { create } from './window';
import { callDavAstAPI } from './dva-ast';

let win;
export function init() {
  win = create({ width: 800, height: 600 });
  win.loadURL(`file://${join($dirname, '..', 'pages')}/main.html`);
}

export function openProject(projectPath) {
  callDavAstAPI({ method: 'project.loadAll', sourcePath: projectPath }, win.webContents);
}

export function syncProjectInfo(sourcePath) {
  win.webContents.send('request', {
    action: 'project/sync',
    payload: {
      sourcePath,
    },
  });
}

export function openProjectByDialog() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
    }, (dirs) => {
      if (dirs && dirs[0]) {
        const projectPath = dirs[0];
        openProject(projectPath);
        resolve(projectPath);
        // menu.reload();
      } else {
        reject(null);
      }
    });
  });
}
