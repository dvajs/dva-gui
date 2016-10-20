const { Emitter } = require('event-kit');
const application = require('./application');
const commonder = require('../commond-register');

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
  application.initialize();
  enviroment.application = application;
  commonder.attach(application.emitter, 'application');
};

exports.setupWorkspace = () => {

};

exports.setupEditor = () => {

};
