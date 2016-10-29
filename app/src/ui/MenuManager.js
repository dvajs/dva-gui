const { Menu } = require('electron');

class MenuManager {
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
      if (item.command) {
        const { commands } = cygnus;
        const { command } = item;
        item.click = (menuItem, browserWindow, event) => {
          commands.dispatch(command, { event, payload: { browserWindow } });
        };
        delete item.command;
      }
      return item;
    });
  }
}

module.exports = MenuManager;
