 const Base = require('./base.js');

 module.exports = class extends Base {
   indexAction() {
    let data = this.getData('tech', '河北冀勘工程技术服务有限公司-技术服务')
    this.assign(data)
     return this.display('tech');
   }
 };
 