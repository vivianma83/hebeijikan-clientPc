/** 异步请求ajax封装
 * 
 */

const Ajax = {
	get(url, params){
		return requestData(url, params, 'get');
	},
	post(url, params){
		return requestData(url, params, 'post');
  },
  jsonp(url, params, jsonp){
    return requestData(url, params, 'get', true, jsonp);
  }
};

function requestData(url, params, method, isJsonp = false, jsonp){
	const reqSetting = {
		url: url,
		method: method,
		data: params,
		timeout: 10000,
		async: true
  };
  if(isJsonp) {
		reqSetting.dataType = 'jsonp';
		if(jsonp){reqSetting.jsonp = jsonp}
  }
	return $.ajax(reqSetting).then((data)=>{
		return data;
	}, (err) => {
	})
}
export {Ajax}