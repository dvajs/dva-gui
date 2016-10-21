const ipcHelper = require('./ipc-helper')('node');

class CommondRegisterMain {
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

  dispatch(commondName, payload) {
    try {
      const action = commondName.split(':');
      const service = this.services[commondName];
      service({
        ipc: ipcHelper,
        dispatch: this.dispatch.bind(this),
        ctx: this.store[action[0]],
      }, payload);
    } catch(e) {
      console.error('[Error] from: ', commondName);
      console.error(e);
    }
  }
}

const commondRegisterMain = new CommondRegisterMain();
module.exports = commondRegisterMain;
