/**
 * 平台首页入口
 */
const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display('index');
  }
};
