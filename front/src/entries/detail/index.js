import 'Common/base'
import './banner.css';
import './detail.css';
import 'Common/mediaQuery.css'
$(function(){
  $(function(){
    ;$('.tab_item').click(function(){
      $(this).addClass('selected').siblings().removeClass("selected");;
      $('.tab_context p').hide();
        $('.tab_context>p').eq($(this).index()).show();
    });
  
  })

})