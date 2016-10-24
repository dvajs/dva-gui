class CygnusWorkspace {
  constructor() {
    this.current = '';
    this.root = '';
    this.tree = {};

    this.refresh.bind(this);
  }

  refresh(payload) {
    this.tree = payload.tree;
    this.root = payload.root;
    this.current = payload.current;
  }
}

const workspace = new CygnusWorkspace();

module.exports = workspace;
