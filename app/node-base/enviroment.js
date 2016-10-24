const application = require('./application');
const dvaAst = require('./dva-ast-main');
const commonder = require('../commond-register');
const crashHandler = require('./crash-handler');

const enviroment = {
  application: null,
  editor: null,
  workspace: null,
  commonder: null,
  menus: null,
};

exports.setupEnviroment = () => {
  global.cygnus = enviroment;
};

exports.clearEnviroment = () => {
  enviroment.application = null;
  enviroment.editor = null;
  enviroment.workspace = null;
  enviroment.commonder = null;
};

exports.setupCommonder = () => {
  enviroment.commonder = commonder;
};

exports.setupApplication = () => {
  enviroment.application = application;
  commonder.attach(application);
  commonder.attach(dvaAst);
  commonder.attach(crashHandler);
};

exports.setupWorkspace = () => {

};

exports.setupEditor = () => {

};
