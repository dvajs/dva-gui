const ipcHelper = require('./ipc-helper')('node');

class CommandRegisterMain {
  constructor() {
    this.store = {};
    this.services = {};
  }

  attach(target) {
    if (!target.namespace) {
      Object.assign(this.services, target.services);
      return;
    }
    this.store[target.namespace] = target.context;
    Object.assign(this.services, target.services);
    target.initialize(target.context);
  }

  dispatch(commandName, payload) {
    try {
      const action = commandName.split(':');
      const service = this.services[commandName];
      console.log(this.services);
      if (!service) {
        ipcHelper.push('error', `${commandName} is not defined.`);
        return;
      }
      service({
        ipc: ipcHelper,
        dispatch: this.dispatch.bind(this),
        ctx: this.store[action[0]],
      }, payload);
    } catch (e) {
      console.error('[Error] from: ', commandName);
      console.error(e);
      ipcHelper.push('error', e.message);
    }
  }
}

const command = new CommandRegisterMain();
module.exports = command;
