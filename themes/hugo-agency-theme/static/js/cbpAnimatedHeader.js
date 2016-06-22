/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

 var changeHeaderOn = $(window).height();
 var $navbarCollapse = $('#bs-example-navbar-collapse-1');

 $( window ).resize(function() {
   changeHeaderOn = $(window).height();
 });

var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-default' ),
    footerBar = document.querySelector( '#footer-bar' ),
		didScroll = false;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
    console.log(scrollY());
    // shows the navbar only when it is scrolled more than the value in 'changeHeaderOn'
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
      classie.add(footerBar, 'show');
		}
		else {
			classie.remove( header, 'navbar-shrink' );
      classie.remove(footerBar, 'show');
      $navbarCollapse.removeClass('in');
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();
