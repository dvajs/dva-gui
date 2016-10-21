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
    'project.loadAll': ({ event, payload }) => {
      const { sourcePath } = payload;
      const result = api.default('project.loadAll', { sourcePath });
      mergeProject(sourcePath, result, /*isReplace*/true);
      event.sender.send('request', 'replaceState', combine.default(projects[sourcePath]));
    }
  }
}
