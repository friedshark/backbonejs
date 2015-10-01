define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	var $doc = $(document);

	var changeEvents = 'fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange';
	var errorEvents = 'fullscreenerror webkitfullscreenerror mozfullscreenerror MSFullscreenError';

	function toggleFullscreen (el, cb) {

		if(Modernizr.fullscreen) {

			if(fullScreenActive()) {
				exitFullscreen();
			}
			else {
				requestFullscreen(el, cb);
			}
		}
	}

	function addEvents(cb) {

		if(cb) {
			$doc.on(changeEvents, function () {
				cb(!!fullScreenActive());
			});
		}
		$doc.on(errorEvents, removeEvents);
	}

	function removeEvents() {

		$doc.off(changeEvents + ' ' + errorEvents);
	}

	function fullScreenActive() {

		return (document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullScreenElement ||
			document.msFullscreenElement);
	}

	function exitFullscreen () {

		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
		else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}

		removeEvents();
	}

	function requestFullscreen (el, cb) {

		addEvents(cb);

		if (el.requestFullscreen) {
			el.requestFullscreen();
		}
		else if (el.webkitRequestFullscreen) {
			el.webkitRequestFullscreen();
		}
		else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen();
		}
		else if (el.msRequestFullscreen) {
			el.msRequestFullscreen();
		}
	}

	return {
		toggleFullscreen: toggleFullscreen
	}
});
