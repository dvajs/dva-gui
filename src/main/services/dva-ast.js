import { ipcMain as ipc } from 'electron';
import log from 'electron-log';
import { api, combine } from 'dva-ast';

const projects = {};
function mergeProject(sourcePath, data, isReplace) {
  if (isReplace) {
    projects[sourcePath] = data;
  } else {
    projects[sourcePath] = Object.assign(projects[sourcePath] || {}, data);
  }
}

function removeAstFromProject(sourcePath, filePath) {
  delete projects[sourcePath][filePath];
}

export function callDavAstAPI(payload, sender) {
  const { method } = payload;
  log.info(`(services/dva-ast) [INFO][dva-ast-api] received ${method}`);

  const { sourcePath, filePath } = payload;
  log.info(`(services/dva-ast) sourcePath ${sourcePath}`);
  log.info(`(services/dva-ast) filePath ${filePath}`);

  const result = api(method, payload);
  const sendReplateStateAction = () => {
    sender.send('request', {
      action: 'replaceState',
      payload: combine(projects[sourcePath]),
    });
  };

  switch (method) {
    case 'project.loadAll':
      mergeProject(sourcePath, result, true);
      sendReplateStateAction();
      break;
    case 'models.create':
    case 'models.updateNamespace':
    case 'models.updateState':
    case 'models.addReducer':
    case 'models.updateReducer':
    case 'models.removeReducer':
    case 'models.addEffect':
    case 'models.updateEffect':
    case 'models.removeEffect':
    case 'models.addSubscription':
    case 'models.updateSubscription':
    case 'models.removeSubscription':
      mergeProject(sourcePath, { [filePath]: result });
      sendReplateStateAction();
      break;
    case 'models.remove':
      removeAstFromProject(sourcePath, filePath);
      sendReplateStateAction();
      break;
    case 'routeComponents.create':
    case 'routeComponents.update':
    case 'routeComponents.addDispatch':
      mergeProject(sourcePath, { [filePath]: result });
      sendReplateStateAction();
      break;
    case 'routeComponents.remove':
      removeAstFromProject(sourcePath, filePath);
      sendReplateStateAction();
      break;
    default:
      log.info(`(services/dva-ast) [ERROR][dva-ast-api service] uncaught method ${method}`);
      sender.send('request', {
        action: 'error',
        payload: `uncaught method ${method}`,
      });
      break;
  }
}

export function init() {
  ipc.on('dva-ast-api', (event, payload) => {
    callDavAstAPI(payload, event.sender);
  });
}
