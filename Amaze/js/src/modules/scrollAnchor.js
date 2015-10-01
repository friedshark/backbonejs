define(['jquery', 'modules/globalDispatcher', 'modules/animate'], function ($, globalDispatcher, animate) {

	'use strict';

	var options = {
		scrollDuration: 500,
		scrollEasing: 'ease-out'
	};

	function trigger(id, suppressScroll) {

		globalDispatcher.trigger('scroll.ScrollAnchor', id);

		return ((suppressScroll) ? $.Deferred().resolve() : animate($('#' + id), 'scroll', {
				duration: options.scrollDuration,
				easing: options.scrollEasing
			})).then(function () {
			globalDispatcher.trigger('scrolled.ScrollAnchor', id);
		});
	}

	return {
		trigger: trigger
	};
});
