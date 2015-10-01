define(['vendor/backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click': 'handleClick'
		},

		initialize: function (opts) {

			this.options = _.extend({}, opts);
			console.log(this.model && this.model.get('name'));
		},

		handleClick: function () {

			console.log('click');
		}
	});
});
