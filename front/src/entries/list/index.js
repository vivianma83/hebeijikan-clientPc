import 'Common/base';
import './banner.css';
import './list.css';
import 'Common/mediaQuery.css'

$(function(){
  function getParam(path) {
    var result = {},
      param = /([^?=&]+)=([^&]+)/ig,
      match;
    while ((match = param.exec(path)) !== null) {
      result[match[1]] = decodeURIComponent(match[2]);
    }
    return result;
  }
  var reloadPage = function (param, value) {
    var params;
    var loc = document.location;
    params = getParam(loc.search);
    console.log('params is--->', params)
    if (param !== 'pn') {
      // start with new page
      delete params['pn'];
    }
    if (param === 'cs') {
      delete params['ct'];
    }
    if (value === '') {
      delete params[param];
    } else {
      params[param] = value;
    }
    var href = loc.protocol + '//' + loc.host + loc.pathname + '?' + $.param(params);
    loc.href = href;
  }
  var $allReloadEles = $('.js-reload-page-param');
  $allReloadEles.on('click', '[data-val]', function (e) {
    e.preventDefault();
    var $self = $(this);
    var param = $self.closest('[data-param]').data('param');
    reloadPage(param, $(this).data('val'));
  });
})