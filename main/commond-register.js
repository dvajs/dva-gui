class CommondRegisterMain {
  constructor() {
    this.commondListeners = {};
    this.dispatch = this.dispatch.bind(this);
    this.attach = this.attach.bind(this);
  }

  attach(targetEmitter, targetName) {
    const inlineTrigger = targetEmitter;
    this.commondListeners[targetName] = inlineTrigger;
  }

  dispatch(commondName, payload) {
    const action = commondName.split(':');
    const trigger = this.commondListeners[action[0]];
    trigger.emit(commondName, payload);
  }
}

const commondRegisterMain = new CommondRegisterMain();
module.exports = commondRegisterMain;
