// Activate Header
var $preword = $('#preword');
var $footerNav = $('#footer-bar');
var footerBarMinBottom = -100;

function scrollToPreword(){
  $('html, body').stop().animate({
      scrollTop: $preword.offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
  return false;
}

function ToggleFooterNav(){
  if($footerNav.hasClass('small')){
    $footerNav.removeClass('small');
  }
  else{
    $footerNav.addClass('small');
  }
  return false;
}

$(document).ready(function() {
  var url = window.location.href;
  if(url.indexOf('#load:') != -1) {
    $('#portfolioModal' + url.substr(url.lastIndexOf(':') + 1, url.length)).modal('show');
  }

});
