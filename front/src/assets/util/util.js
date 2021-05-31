import {
	Cookie
} from "./cookie";

/**
 * 数据处理，获取图片宽高
 * @param {object} 信息流宽度和列数 
 * @returns {object} 返回图片宽高
 */

// 是否在视野
const isInView = (obj, num = 0, botNum = 0) => {
	const win = $(window);
	const winHeight = win.height();
	const objHeight = obj.height();
	const offsetTop = obj.offset().top;
	const scrollTop = win.scrollTop() + num;
	if (offsetTop > scrollTop && offsetTop < (scrollTop + winHeight - botNum - num) || offsetTop < scrollTop && (offsetTop + objHeight) > scrollTop) {
		return true;
	}
	return false;
}

/**
 * 发布时间
 * @param {publicTime:[number] 原始数据中的时间戳} 
 * @param {curTime:[number] 当前的时间戳}
 * @returns {string} 时间格式
 */
const getPublicTime = (publicTime, curTime = new Date().getTime()) => {
	const len = publicTime.toString().length;
	if (len < 13) { // 有的给的时间戳不一致
		publicTime = publicTime * Math.pow(10, 13 - len);
	}
	const timeDistance = curTime - publicTime;
	if (timeDistance < 60 * 1000) {
		return `刚刚`;
	} else if (timeDistance >= 60 * 1000 && timeDistance < 3600 * 1000) {
		const minutesAgo = Math.floor(timeDistance / 60000);
		return `${minutesAgo}分钟前`;
	} else if (timeDistance >= 3600 * 1000 && timeDistance < 86400 * 1000) {
		const hourAgo = Math.floor(timeDistance / 3600000);
		return `${hourAgo}小时前`;
	} else if (timeDistance >= 86400 * 1000 && timeDistance < 172800 * 1000) {
		return `1天前`;
	} else {
		let detailDate = new Date(publicTime),
			detailDateM = parseInt(detailDate.getMonth(), 10) + 1,
			detailDateD = detailDate.getDate();
		detailDateM = detailDateM < 10 ? '0' + detailDateM : detailDateM;
		detailDateD = detailDateD < 10 ? '0' + detailDateD : detailDateD;
		return detailDateM + '-' + detailDateD;
	}
}

// 截字，根据当前文字大小
const truncate = (str, setting) => {
	let fontSize = 18;
	if (setting.flowWidth < 400) { // 边栏
		fontSize = 14;
	}
	const num = Math.floor((setting.flowWidth - setting.sImgWidth - 30) * 2 / fontSize);
	str = str.length > num ? str.slice(0, num) + '…' : str;
	return str
}


const durationFormat = (num) => {
	if(num < 0) {
		return
	}
	let m = Math.floor(num / 60);
	let s = num % 60;
	m = m.toString().length > 1 ? m : '0' + m;
	s = m.toString().length > 1 ? s : '0' + s;
	return m + ':' + s;
}

function joinHtml(setting, i) {
	if (setting.insertPos.length && setting.insertPos.includes(i)) {
		return setting.busiLi;
	}
	return '';
}
const queryUrl = (url, key) => {
	url = url.replace(/^[^?=]*\?/ig, '').split('#')[0]; //去除网址与hash信息
	let json = {};
	//考虑到key中可能有特殊符号如“[].”等，而[]却有是否被编码的可能，所以，牺牲效率以求严谨，就算传了key参数，也是全部解析url。
	url.replace(/(^|&)([^&=]+)=([^&]*)/g, function (a, b, key, value) {
		//对url这样不可信的内容进行decode，可能会抛异常，try一下；另外为了得到最合适的结果，这里要分别try
		try {
			key = decodeURIComponent(key);
		} catch (e) {}

		try {
			value = decodeURIComponent(value);
		} catch (e) {}

		if (!(key in json)) {
			json[key] = /\[\]$/.test(key) ? [value] : value; //如果参数名以[]结尾，则当作数组
		} else if (json[key] instanceof Array) {
			json[key].push(value);
		} else {
			json[key] = [json[key], value];
		}
	});
	return key ? json[key] : json;
}


let Browser = () => {
	let e = window.navigator,
		t = e.userAgent.toLowerCase(),
		n = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/ig,
		r = {
			platform: e.platform
		};

	t.replace(n, function (e, t, n) {
			r[t] || (r[t] = n);
		}),
		r.opera && t.replace(/opera.*version\/([\d.]+)/, function (e, t) {
			r.opera = t;
		}),
		!r.msie && r.trident && t.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/ig, function (e, t) {
			r.msie = t;
		});

	if (r.msie) {
		r.ie = r.msie;
		var i = parseInt(r.msie, 10);
		r['ie' + i] = !0;
	}

	return r;
}

export {
	getPublicTime,
	isInView,
	truncate,
	durationFormat,
	joinHtml,
	queryUrl,
	Browser
}