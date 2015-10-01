define(['modules/globalDispatcher', 'vendor/backbone', 'underscore', 'models/_exampleModel', 'views/_exampleView'], function (globalDispatcher, Backbone, _, ModelExample, ViewExample) {

	'use strict';

	return function ExampleController(opts) {

		var options = _.extend({}, opts);

		var model = new ModelExample({
				name: '_exampleModel'
			}),
			view = new ViewExample({
				model: model
			});
	};

});
