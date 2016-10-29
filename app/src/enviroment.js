const application = require('./services/application');
const dvaAst = require('./services/dva-ast');
const commands = require('./utils/command');

const enviroment = {
  application: null,
  editor: null,
  workspace: null,
  commands: null,
  menus: null,
};

const setupEnviroment = () => {
  global.cygnus = enviroment;
};

/*
const clearEnviroment = () => {
  enviroment.application = null;
  enviroment.editor = null;
  enviroment.workspace = null;
  enviroment.commands = null;
};
*/

const setupCommands = () => {
  enviroment.commands = commands;
};

const setupApplication = () => {
  enviroment.application = application;
  commands.attach(application);
  commands.attach(dvaAst);
};

/*
const setupWorkspace = () => {};
const setupEditor = () => {};
*/

exports.bootstrap = function bootstrap() {
  setupEnviroment();
  setupCommands();
  setupApplication();
};
