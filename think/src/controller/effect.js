/**
 * 访问所有effect目录下的模版
 */
const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    const page = this.get('page');
    return this.display(`effect/${page}`);
  }
};
