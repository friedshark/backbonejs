define(['vendor/backbone'], function (Backbone) {

	'use strict';

	return Backbone.Model.extend({
		
        defaults: {
            title: null,
            link: null,
            summary: null
        }
	});
});
