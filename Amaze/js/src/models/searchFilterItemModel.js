define(['vendor/backbone'], function (Backbone) {

	'use strict';

	return Backbone.Model.extend({

        defaults: {
            text: null,
            value: null
        }
	});
});
