define(['jquery', 'polyfills', 'modules/globalDispatcher', 'modules/breakpoints'],
    function ($, polyfills, globalDispatcher, Breakpoints) {

	    'use strict';

	    // IE Detection
	    $('html').addClass(!!~window.navigator.userAgent.indexOf('Trident') ? 'ie': 'no-ie');

        // DEV helpers
        globalDispatcher.on('change.Breakpoints', function(current, prev) {
            console.log(current, prev);
        });

	    return {
		    breakpoints: new Breakpoints(globalDispatcher),
		    polyfills: polyfills
	    };
    }
);
