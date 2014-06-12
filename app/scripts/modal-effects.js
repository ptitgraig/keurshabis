/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function($) {

	function init() {

		//var overlay = document.querySelector( '.md-overlay' );
		var overlay = $( '.md-overlay' );

		//[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {
		$( '.md-trigger' ).each( function( i, el ) {

			//var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
			var modal = $( '#' + el.getAttribute( 'data-modal' ) ),
				//close = modal.querySelector( '.md-close' );
				close = modal.find( '.md-close' );

			function removeModal( hasPerspective ) {
				//classie.remove( modal, 'md-show' );
				modal.removeClass('md-show');

				if( hasPerspective ) {
					//classie.remove( document.documentElement, 'md-perspective' );
					$('html').removeClass('md-perspective');
				}
			}

			function removeModalHandler() {
				//removeModal( classie.has( el, 'md-setperspective' ) ); 
				removeModal( $(el).hasClass('md-setperspective') ); 
			}

			$(el).on( 'click', function( ev ) {
				
				//classie.add( modal, 'md-show' );
				modal.addClass('md-show');
				overlay.off( 'click', removeModalHandler );
				overlay.on( 'click', removeModalHandler );

				if( $(el).hasClass('md-setperspective') ) {
					setTimeout( function() {
						$('html').addClass('md-perspective');
						//classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			close.on( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );

	}

	init();

})($);