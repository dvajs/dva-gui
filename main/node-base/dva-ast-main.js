const { api, combine } = require('dva-ast');
const { Emitter } = require('event-kit');

const projects = {};
function mergeProject(sourcePath, data, isReplace) {
  if (isReplace) {
    projects[sourcePath] = data;
  } else {
    projects[sourcePath] = Object.assign(projects[sourcePath] || {}, data);
  }
}

class DvaAstMain {
  constructor() {
    this.emitter = new Emitter();
    this.registerEvents.bind(this)();
  }

  loadAll(event, { sourcePath }) {
    const result = api.default('project.loadAll', { sourcePath });
    mergeProject(sourcePath, result, /*isReplace*/true);
    event.sender.send('request', 'replaceState', combine.default(projects[sourcePath]));
  }

  creat() {}

  remove() {}

  updateNamespace() {}

  updateState() {}

  addReducer() {}

  updateReducer() {}

  removeReducer() {}

  addEffect() {}

  updateEffect() {}

  removeEffect() {}

  addSubscription() {}

  updateSubscription() {}

  removeSubscription() {}

  registerEvents() {
    const dvaAst = this;
    const { emitter } = this;

    emitter.on('dva:loadAll', ({ event, payload }) => { dvaAst.loadAll(event, payload) });
    emitter.on('dva:removeSubscription', () => { dvaAst.remove() });
    emitter.on('dva:remove', () => { dvaAst.remove() });
  }
}

const dvaAst = new DvaAstMain();

module.exports = dvaAst;