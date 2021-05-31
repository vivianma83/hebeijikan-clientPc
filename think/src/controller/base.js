module.exports = class extends think.Controller {
  getData(page, title){
    return {
      nav: [{
        "text": "首页",
        "link":"/",
        "name":'index'
      },{
        "text": "技术服务",
        "link":"/tech",
        "name":'tech'
      },{
        "text": "关于我们",
        "link":"/about",
        "name":'about'
      },{
        "text": "人才招聘",
        "link":"/join",
        "name":'join'
      }],
      active: page ? page : "index",
      title: title ? title: "河北冀勘工程技术服务有限公司"
    }
  }
  __before() {

  }
};

