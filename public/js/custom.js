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
var addThisToIndex = 0;

function scrollToPreword(){
  $('html, body').stop().animate({
      scrollTop: $preword.offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
  return false;
}

// Make Unslider work
$('#footer-bar .brands').unslider();

$('#interview .slider').unslider();

$('#interview_2 .slider').unslider();

$('#interview_3 .slider').unslider();

$('#fieldreport .slider').unslider();

$('#studienanfaenger .slider').unslider();

$('#druck3d .slider').unslider();

function ChangeLanguage(languageName){
  if(languageName === "de"){
    if(languageName !== currentLanguage){
      //console.log("switch ln to de");
      $allDEBlocks.css("display", "block");
      $allENBlocks.css("display", "none");
      currentLanguage = languageName;
    }
  }
  else if(languageName === "en"){
    if(languageName !== currentLanguage){
      //console.log("switch ln to en");
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
  imageParent.find('img:nth-child(' + (currentImgIndex) + ')').css({"visibility": "hidden", "opacity": "0"});
  currentImgIndex++;
  if(currentImgIndex > 5){
    currentImgIndex = 2;
  }
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
  imageParent.find('img:nth-child(' + (currentImgIndex) + ')').css({"visibility": "visible", "opacity": "1"});
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

function UpdateAllImages(addThisToIndex){
  $('.portfolio-hover').each(function (index){
    if(((index + addThisToIndex) % 3) === 0){
      FadeImageOverTime($( this ).parent());
    }
  });
}

var video = $('.covervideo')[0];
var videoJ = $('.covervideo');
videoJ.on('ended', function () {
    part();
});

function part(){
    $(".covervideo").css({"display": "none"});
    $(".video_contain").css({"position": "relative", "top": "0", "left": "0", "height": "100%", "width": "100%", "background-image": "url(../img/videoposter.png)", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
}

var navOpen = false;
function ToggleScrollable(){
  if(navOpen === false){
    $('body').bind('touchmove');
    $('body').bind('scroll');
    //$('body').css("overflow", "hidden");
    //console.log("working true");
    navOpen = true;
  }
  else{
    $('body').unbind('touchmove');
    $('body').unbind('scroll');
    navOpen = false;
    //$('body').css("overflow", "auto");
  }
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
      //currentImgIndex = 1;
      //curretInterval = setInterval(function(){FadeImageOverTime(parentEl)}, 3000);
    }, function() {
      var parentEl = $( this ).parent();
      //clearInterval(curretInterval);
      //ResetImage(parentEl);
      parentEl.removeClass("showInfo");
    });

    currentImgIndex = 1;
    curretInterval = setInterval(function(){
      addThisToIndex++;
      if(addThisToIndex >= 3){
        addThisToIndex = 0;
      }
      UpdateAllImages(addThisToIndex)
    }, 3000);
    setTimeout(function(){GetParallaxPositions();}, 1000);

    // OnClick
    $('#animated_numbers .countToNumber').click(function(){
      var child = $(this).find('.number-text');
      if(child.hasClass('hide')){
        child.removeClass('hide');
      }
      else{
        child.addClass('hide');
      };
    });
});
