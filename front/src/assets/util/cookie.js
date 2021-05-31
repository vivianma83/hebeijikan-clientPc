/**
 * @class Cookie Cookie类
 * @namespace jQuery
 * @param {Json} options (Optional) Cookie参数配置，目前支持以下配置
 *  {string} path 
 *  {string} domain  
 *  {int} expires
 *  {string} secure 
 */
function Cookie(options) {
	$.extend(true, this, options || {});
}

Cookie.prototype = {
	/**
	 * 存储
	 * @method set
	 * @param {string} key
	 * @param {string} value
	 * @return void
	 */
	set:function(key, value){
		let expires = this.expires;

		if(typeof(expires) == 'number'){
			expires = new Date();
			expires.setTime(expires.getTime() + this.expires);
		}

		document.cookie =
			key + '=' + escape(value)
			+ (expires ? ';expires=' + expires.toGMTString() : '')
			+ (this.path ? ';path=' + this.path : '')
			+ (this.domain ? '; domain=' + this.domain : '')
			+ (this.secure ? '; secure' : '');
	},

	/**
	 * 读取
	 * @method get
	 * @param {string} key
	 * @return string
	 */
	get:function(key){
		let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
		let a = document.cookie.match(reg);
		if(a){
			return unescape(a[2]);
		}else{
			return '';
		}
	},
	
	/*
	 * 移除
	 * @method remove
	 * @param {string} key
	 * @return void
	 */
	remove:function(key){
		let old=this.expires;
		this.expires = new Date(0);
		this.set(key,'');
		this.expires=old;
	}
};


/**
 * 存储
 * @method set
 * @static
 * @param {string} key
 * @param {string} value
 * @param {Json} options (Optional) 更多cookie参数
 * @return void
 */
Cookie.set=function(key,value,options){
	new Cookie(options).set(key,value);
};

/**
 * 读取
 * @method get
 * @static
 * @param {string} key
 * @param {Json} options (Optional) 更多cookie参数
 * @return string
 */
Cookie.get=function(key,options){
	return new Cookie(options).get(key);
};

/**
 * 移除
 * @method set
 * @static
 * @param {string} key
 * @param {Json} options (Optional) 更多cookie参数
 * @return void
 */
Cookie.remove=function(key,options){
	new Cookie(options).remove(key);
};

export {Cookie};