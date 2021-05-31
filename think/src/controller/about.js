/**
 * 平台首页入口
 */
 const Base = require('./base.js');

 module.exports = class extends Base {
   indexAction() {
    let data = this.getData('about', '河北冀勘工程技术服务有限公司-关于我们')
    this.assign(data)
     return this.display('about');
   }
 };
 
