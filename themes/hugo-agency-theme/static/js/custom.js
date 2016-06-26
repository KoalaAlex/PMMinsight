// Activate Header
var $preword = $('#preword');
var $footerNav = $('#footer-bar');
var footerBarMinBottom = -100;
var currentLanguage = "de";
var $allDEBlocks = $('.lg-de');
var $allENBlocks = $('.lg-en');
var currentImgIndex = 1;
var timeSinceStarted = 0;
var curretInterval = null;

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

function FadeImageOverTime(imageParent){
  timeSinceStarted = Date.now();
  currentImgIndex--;
  if((currentImgIndex) < 2){
    currentImgIndex = 5;
  }
  console.log(currentImgIndex);
  imageParent.find('img:nth-child(' + (currentImgIndex) + ')').css({"visibility": "hidden", "opacity": "0"});
  currentImgIndex++;
  if(currentImgIndex > 5){
    currentImgIndex = 2;
  }
  console.log(currentImgIndex);
  if(currentImgIndex === 5){
    imageParent.find('img:nth-child(' + (currentImgIndex) + ')').css({"visibility": "visible", "opacity": "0", "z-index": "-1"});
  }
  else{
    imageParent.find('img:nth-child(' + (currentImgIndex) + ')').css({"visibility": "visible", "opacity": "0"});
  }
  currentImgIndex++;
  if(currentImgIndex > 5){
    currentImgIndex = 2;
  }
  console.log(currentImgIndex);
  imageParent.find('img:nth-child(' + (currentImgIndex) + ')').css({"visibility": "visible", "opacity": "1"});
  console.log("working");
}

function ResetImage(imageParent){
  imageParent.find("img").css({"visibility": "visible", "opacity": "1"});
  currentImgIndex = 1;
  imageParent.find("img:nth-child(2)").css({"visibility": "visible", "opacity": "1"});
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
      var parentEl = $( this ).parent();
      parentEl.addClass("showInfo");
      currentImgIndex = 1;
      curretInterval = setInterval(function(){FadeImageOverTime(parentEl)}, 3000);
    }, function() {
      clearInterval(curretInterval);
      var parentEl = $( this ).parent();
      ResetImage(parentEl);
      parentEl.removeClass("showInfo");
    });
});
