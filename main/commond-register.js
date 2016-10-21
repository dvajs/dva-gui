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
      if (!action[1]) {
        const service = this.services[commondName];
        service(payload);
        return;
      }
      const service = this.services[commondName];
      service(this.store[action[0]], payload);
    } catch(e) {
      console.error('[Error] from: ', commondName);
      console.error(e);
    }
  }
}

const commondRegisterMain = new CommondRegisterMain();
module.exports = commondRegisterMain;
