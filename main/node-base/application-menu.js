const { Menu } = require('electron');

class ApplicationMenu {
  constructor(template) {
    this.parsed = this.filter.bind(this)(template);
    this.builded = Menu.buildFromTemplate(this.parsed);
    this.update = this.update.bind(this);
  }

  update(template) {
    this.parsed = this.filter.bind(this)(template);
    this.builded = Menu.buildFromTemplate(this.parsed);
  }

  filter(template) {
    const self = this;

    return template.map((item) => {
      item.submenu = self.filterSubmenu(item.submenu);
      return item;
    });
  }

  filterSubmenu(subTemplate) {
    return subTemplate.map((item) => {
      if (item.commond) {
        const { commonder } = cygnus;
        const { commond } = item;
        item.click = (menuItem, browserWindow, event) => {
          commonder.dispatch(commond, { event, payload: { browserWindow } });
        };
        delete item.commond;
      }
      return item;
    });
  }
}

module.exports = ApplicationMenu;
