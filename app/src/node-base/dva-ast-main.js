const { api, combine } = require('dva-ast');

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

module.exports = {
  namespace: '',
  services: {
    'dva-ast-api': ({ ipc }, { payload }) => {
      const { method } = payload;
      console.info(`[INFO][dva-ast-api] received ${method} ${payload}`);

      const { sourcePath, filePath } = payload;
      console.log(payload);
      console.log(sourcePath, filePath);
      const result = api(method, payload);

      switch (method) {
        case 'project.loadAll':
          mergeProject(sourcePath, result, true);
          ipc.push('replaceState', combine(projects[sourcePath]));
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
          ipc.push('replaceState', combine(projects[sourcePath]));
          break;
        case 'models.remove':
          removeAstFromProject(sourcePath, filePath);
          ipc.push('replaceState', combine(projects[sourcePath]));
          break;
        case 'routeComponents.create':
        case 'routeComponents.addDispatch':
          mergeProject(sourcePath, { [filePath]: result });
          ipc.push('replaceState', combine(projects[sourcePath]));
          break;
        case 'routeComponents.remove':
          removeAstFromProject(sourcePath, filePath);
          ipc.push('replaceState', combine(projects[sourcePath]));
          break;
        default:
          console.error(`[ERROR][dva-ast-api service] uncaught method ${method}`);
          ipc.push('error', `uncaught method ${method}`);
          break;
      }
    },
  },
};
