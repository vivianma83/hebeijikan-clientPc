/**
 * 平台首页入口
 */
const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    let data = this.getData('index', '河北冀勘工程技术服务有限公司')
    this.assign(data)
    return this.display('index');
  }
};
