define(['vendor/backbone'], function (Backbone) {

	'use strict';

	return Backbone.Model.extend({

		defaults: {
			active: true,
			mode: 'living',
			webGl: false
		}
	});
});
