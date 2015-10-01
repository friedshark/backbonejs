define(['vendor/backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click': 'handleClick'
		},

		initialize: function (opts) {

			this.options = _.extend({}, opts);
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		handleClick: function (e) {

			e.preventDefault();

			this.options.eventDispatcher.trigger('open.SearchOverlay');
		}
	});
});
