define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	var $win = $(window);

	function raf(fn) {

		if (window.requestAnimationFrame) {

			return function () {

				var args = Array.prototype.slice.call(arguments);

				window.requestAnimationFrame(function () {
					fn.apply(this, args);
				});
			}
		}

		return fn;
	}

	function scroll(fn) {

		var scrollPos = {},
			scrollDelta = {},
			callbackActive = false,
			scrollActive = false,
			rafCallback = raf(callback),
			prevScrollPos = getScrollPos();

		function track (evt) {

			scrollPos = getScrollPos();

			requestFrame();
		}

		function requestFrame() {

			if (!callbackActive) {

				callbackActive = true;
				rafCallback();
			}
		}

		function callback() {

			callbackActive = false;
			fn(scrollPos, getScrollDelta(scrollPos, prevScrollPos));

			prevScrollPos = scrollPos;
		}

		function getScrollPos() {

			return {
				x: window.pageXOffset,
				y: window.pageYOffset
			}
		}

		function getScrollDelta(curr, prev) {

			return Object.keys(curr).reduce(function (obj, key) {
				obj[key] = prev[key] ? curr[key] - prev[key] : 0;
				return obj;
			}, {});
		}

		var api = {

			start: function () {

				$win.on('scroll', track);
				scrollActive = true;

				return this;
			},
			stop: function () {

				$win.off('scroll', track);
				scrollActive = false;

				return this;
			}
		};

		Object.defineProperty(api, 'active', {
			get: function () {
				return scrollActive;
			}
		});

		return api;
	}

	return {
		debounce: _.debounce,
		throttle: _.throttle,
		raf: raf,
		scroll: scroll
	}
});
