// Activate Header
var $preword = $('#preword');

function scrollToPreword(){
  $('html, body').stop().animate({
      scrollTop: $preword.offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
  return false;
}
