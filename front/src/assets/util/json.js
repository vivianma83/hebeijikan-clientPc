(function(window){
  if( isNaN(new Date("2013-12-09T08:39:15")) ){
    Date.prototype.toJSON = function(){
      var pad = function(a){ return ("0"+a).slice(-2) };
      return this.getFullYear() + '/'+ pad(this.getMonth()+ 1) +"/"+ pad(this.getDate()) +" "+ pad(this.getHours()) +":"+ pad(this.getMinutes()) +":"+ pad(this.getSeconds());
    };
  }
  if( window.JSON ){
    return;
  }
  /*
   * 工具函数
   */
  var escapeMap = {
    "\b": '\\b',
    "\t": '\\t',
    "\n": '\\n',
    "\f": '\\f',
    "\r": '\\r',
    '"' : '\\"',
    "\\": '\\\\'
  },		
  /* 字符串序列化 */
  encodeString = function(source) {
    if (/["\\\x00-\x1f]/.test(source)) {
      source = source.replace(
        /["\\\x00-\x1f]/g, 
        function (match) {
          var c = escapeMap[match];
          if (c) {
            return c;
          }
          c = match.charCodeAt();
          return "\\u00" 
              + Math.floor(c / 16).toString(16) 
              + (c % 16).toString(16);
        });
    }
    return '"' + source + '"';
  },
  /* 数组序列化 */
  encodeArray = function(source) {
    var result = ["["], 
      l = source.length,
      preComma, i, item;
      
    for (i = 0; i < l; i++) {
      item = source[i];
      
      switch (typeof item) {
      case "undefined":
      case "function":
      case "unknown":
        break;
      default:
        if(preComma) {
          result.push(',');
        }
        result.push(encode(item));
        preComma = 1;
      }
    }
    result.push("]");
    return result.join("");
  },
  /* 处理日期序列化时的补零 */
  pad = function(source) {
    return source < 10 ? '0' + source : source;
  },
  /* 日期序列化 */
  encodeDate = function(source){
    if( source.toJSON ) return '"'+source.toJSON()+'"';
    return '"' + source.getUTCFullYear() + "-" 
        + pad(source.getUTCMonth() + 1) + "-" 
        + pad(source.getUTCDate()) + "T" 
        + pad(source.getUTCHours()) + ":" 
        + pad(source.getUTCMinutes()) + ":" 
        + pad(source.getUTCSeconds()) + '"';
  },
  /* 对象序列化 */
  hasOwn = Object.prototype.hasOwnProperty,
  encodeObj = function( value ){
    var result = ['{'], preComma, item;
    for (var key in value) {
      if (hasOwn.call(value, key)) {
        item = value[key];
        switch (typeof item) {
        case 'undefined':
        case 'unknown':
        case 'function':
          break;
        default:
          preComma && result.push(',');
          preComma = 1;
          result.push(encode(key) + ':' + encode(item));
        }
      }
    }
    result.push('}');
    return result.join('');
  },
  /* 序列化接口函数 */
  encode = function (value) {
    switch (typeof value) {
      case 'unknown':
      case 'function':
      case 'undefined':
        return;
      case 'number':
        return isFinite(value) ? String(value) : "null";
      case 'string':
        return encodeString(value);
      case 'boolean':
        return String(value);
      default:
        return value === null ? 'null'
          : value instanceof Array ? encodeArray(value)
          : value instanceof Date ? encodeDate(value)
          : encodeObj(value);
    }
  };
  /*
   * 创建JSON对象
   */
  window.JSON = {
    parse : function(data){//宽容格式解决方案
      data = data.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g, "new Date($2)");
      return (new Function("return " + data))();
    },
    stringify : function(v){ return encode(v); }
  };
  
  })(window);