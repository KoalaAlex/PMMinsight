/**
 * @license Asparagus v1.0
 * (c) 2013 Form5 http://form5.is
 * License: MIT
 */
 // First Parallax
 var $parallax_Hands = $('#parallax_Hands');
 var parallax_HandsTopPos = $parallax_Hands.position().top;
 var $3ddruck = $('#druck3d');
 var p3ddruckTopPos = $3ddruck.position().top;
 // End --

 // Second Parallax
 var $parallax_box_key = $('#parallax_box_key');
 var parallax_box_key_TopPos = $parallax_box_key.position().top;
 var $portfolio = $('#portfolio');
 var portfolioTopPos = $portfolio.position().top;
 // End --

 // Third Parallax
 var $parallax_light_picture = $('#parallax_light_picture');
 var parallax_light_picture_TopPos = $parallax_light_picture.position().top;
 var $crossmedia = $('#crossmedia');
 var crossmediaTopPos = $crossmedia.position().top;
 // End --

 // Fourth Parallax
 var $parallax_group = $('#parallax_group');
 var parallax_group_TopPos = $parallax_group.position().top;
 var $printmedia = $('#printmedia');
 var printmediaTopPos = $printmedia.position().top;
 // End --

 // Fifth Parallax
 var $parallax_study_heads = $('#parallax_study_heads');
 var parallax_study_heads_TopPos = $parallax_study_heads.position().top;
 var $fieldreport = $('#fieldreport');
 var fieldreportTopPos = $fieldreport.position().top;
 // End --

 // Sixt Parallax
 var $parallax_key = $('#parallax_key');
 var parallax_key_TopPos = $parallax_key.position().top;
 var $studienanfaenger = $('#studienanfaenger');
 var studienanfaengerTopPos = $studienanfaenger.position().top;
 // End --

 var $animateNumbers = $('#animated_numbers');
 var animateNumbersTopValue = $animateNumbers.position().top - window.screen.height/2;

 var onceActive = false;

 function GetParallaxPositions(){
   parallax_HandsTopPos = $parallax_Hands.position().top;
   p3ddruckTopPos = $3ddruck.position().top;

   parallax_box_key_TopPos = $parallax_box_key.position().top;
   portfolioTopPos = $portfolio.position().top;

   parallax_light_picture_TopPos = $parallax_light_picture.position().top;
   crossmediaTopPos = $crossmedia.position().top;

   parallax_group_TopPos = $parallax_group.position().top;
   printmediaTopPos = $printmedia.position().top;

   parallax_study_heads_TopPos = $parallax_study_heads.position().top;
   fieldreportTopPos = $fieldreport.position().top;

   studienanfaengerTopPos = $studienanfaenger.position().top;
   parallax_key_TopPos = $parallax_key.position().top;

   // Addition
   animateNumbersTopValue = $animateNumbers.position().top - window.screen.height/2;
 }

 // countNubers
 function FadeAllNumbers(){
     $('.count').each(function () {
       $(this).prop('Counter',0).animate({
           Counter: $(this).text()
       }, {
           duration: 4000,
           easing: 'swing',
           step: function (now) {
               $(this).text(Math.ceil(now));
           }
       });
   });
   console.log("fadeNumbers");
 };

 window.addEventListener("resize", function(){GetParallaxPositions();});

(function() {
  var lastScrollY = 0,
      ticking = false,
      bgElm_Hands = document.getElementById('parallax_Hands-test'),
      bgElm_BoxKey = document.getElementById('parallax_box_key-test'),
      bgElm_LightPicture = document.getElementById('parallax_light_picture-test'),
      bgElm_Group = document.getElementById('parallax_group-test'),
      bgElm_Study_Heads = document.getElementById('parallax_study_heads-test'),
      bgElm_Key = document.getElementById('parallax_key-test'),
      offsetImg = 0,
      speedDivider = 4;

  // Update background position
  var updatePosition = function() {
    var translateValue = lastScrollY;

    // We don't want parallax to happen if scrollpos is below Element
    if(translateValue <= portfolioTopPos){
      if (translateValue < (parallax_box_key_TopPos + offsetImg)){
        translateValue = 0;
      }
      else{
        translateValue = (translateValue - (parallax_box_key_TopPos + offsetImg)) / speedDivider;
      }
      translateY(bgElm_BoxKey, translateValue);
    }

    if(translateValue <= printmediaTopPos){
      if (translateValue < (parallax_group_TopPos + offsetImg)){
        translateValue = 0;
      }
      else{
        translateValue = (translateValue - (parallax_group_TopPos + offsetImg)) / speedDivider;
      }
      translateY(bgElm_Group, translateValue);
    }

    if(translateValue <= crossmediaTopPos){
      if (translateValue < (parallax_light_picture_TopPos + offsetImg)){
        translateValue = 0;
      }
      else{
        translateValue = (translateValue - (parallax_light_picture_TopPos + offsetImg)) / speedDivider;
      }
      translateY(bgElm_LightPicture, translateValue);
    }

    if(translateValue <= p3ddruckTopPos){
      if (translateValue < (parallax_HandsTopPos + offsetImg)){
        translateValue = 0;
      }
      else{
        translateValue = (translateValue - (parallax_HandsTopPos + offsetImg)) / speedDivider;
      }
      translateY(bgElm_Hands, translateValue);
    }

    if(translateValue <= studienanfaengerTopPos){
      if (translateValue < (parallax_key_TopPos + offsetImg)){
        translateValue = 0;
      }
      else{
        translateValue = (translateValue - (parallax_key_TopPos + offsetImg)) / speedDivider;
      }
      translateY(bgElm_Key, translateValue);
    }

    if(translateValue <= fieldreportTopPos){
      if (translateValue < (parallax_study_heads_TopPos + offsetImg)){
        translateValue = 0;
      }
      else{
        translateValue = (translateValue - (parallax_study_heads_TopPos + offsetImg)) / speedDivider;
      }
      translateY(bgElm_Study_Heads, translateValue);
    }
    console.log(translateValue + "  " + animateNumbersTopValue);
    if(translateValue >= animateNumbersTopValue){
      if(onceActive === false){
        onceActive = true;
        FadeAllNumbers();
      }
      else{
        onceActive = false;
      }
    }

    // Stop ticking
    ticking = false;
  };

  // Translates an element on the Y axis using translate3d to ensure
  // that the rendering is done by the GPU
  var translateY = function(elm, value) {
    var translate = 'translate3d(0px,' + value + 'px, 0px)';
    elm.style['-webkit-transform'] = translate;
    elm.style['-moz-transform'] = translate;
    elm.style['-ms-transform'] = translate;
    elm.style['-o-transform'] = translate;
    elm.style.transform = translate;
  };

  // This will limit the calculation of the background position to
  // 60fps as well as blocking it from running multiple times at once
  var requestTick = function() {
    if (!ticking) {
      window.requestAnimationFrame(updatePosition);
      ticking = true;
    }
  };

  // Update scroll value and request tick
  var doScroll = function() {
    lastScrollY = window.pageYOffset;
    requestTick();
  };

  // Initialize on domready
  (function() {
    var loaded = 0;
    var bootstrap = function() {
      if (loaded) return;
      loaded = 1;

      rafPolyfill();
      window.onscroll = doScroll;
    };

    if ( document.readyState === 'complete' ) {
      setTimeout( bootstrap );
    } else {
      document.addEventListener( 'DOMContentLoaded', bootstrap, false );
      window.addEventListener( 'load', bootstrap, false );
    }
  })();

  // RequestAnimationFrame polyfill for older browsers
  var rafPolyfill = function() {
    var lastTime, vendors, x;
    lastTime = 0;
    vendors = ["webkit", "moz"];
    x = 0;
    while (x < vendors.length && !window.requestAnimationFrame) {
      window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
      ++x;
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall;
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  };

}).call(this);
