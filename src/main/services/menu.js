import { Menu } from 'electron';
import log from 'electron-log';
import { openProjectByDialog, syncProjectInfo } from './application';

function getTemplate() {
  return [
    {
      label: 'DvaGUI',
      submenu: [
        {
          label: 'About DvaGUI',
          click: () => {
          },
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open...',
          click: () => {
            openProjectByDialog()
              .then(syncProjectInfo);
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
  ];
}

export function init() {
  log.info('(menu) init');
  const menu = Menu.buildFromTemplate(getTemplate());
  Menu.setApplicationMenu(menu);
}
