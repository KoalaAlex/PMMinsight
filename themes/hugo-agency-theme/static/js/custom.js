// Activate Header
var $preword = $('#preword');
var $footerNav = $('#footer-bar');
var footerBarMinBottom = -100;
var currentLanguage = "de";
var $allDEBlocks = $('.lg-de');
var $allENBlocks = $('.lg-en');

function scrollToPreword(){
  $('html, body').stop().animate({
      scrollTop: $preword.offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
  return false;
}

function ChangeLanguage(languageName){
  if(languageName === "de"){
    if(languageName !== currentLanguage){
      console.log("switch ln to de");
      $allDEBlocks.css("display", "block");
      $allENBlocks.css("display", "none");
      currentLanguage = languageName;
    }
  }
  else if(languageName === "en"){
    if(languageName !== currentLanguage){
      console.log("switch ln to en");
      $allDEBlocks.css("display", "none");
      $allENBlocks.css("display", "block");
      currentLanguage = languageName;
    }
  }
  else{
    console.log("no languge with name " + languageType + " found");
  }
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
  // Beacuse the events is not fired at the start
  $(".navbar .navbar-header .navbar-toggle").addClass("collapsed");

  $(".portfolio-hover").hover(
  function() {
      $( this ).parent().addClass("showInfo");
      console.log("DO");
    }, function() {
      $( this ).parent().removeClass("showInfo");
    });
});
