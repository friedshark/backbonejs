define(['picturefill', 'vendor/fastclick'],
    function (picturefill, fastclick) {

	'use strict';

	fastclick.attach(document.body);

    return {
    	picturefill: picturefill
    }
});
