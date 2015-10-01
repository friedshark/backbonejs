define(['vendor/backbone', 'underscore', 'modules/globalDispatcher'], function (Backbone, _, globalDispatcher) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click': 'menuActivated'
		},

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.render();
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		menuActivated: function (evt) {

			evt.preventDefault();
			evt.stopPropagation();

			this.options.eventDispatcher.trigger('menuActivated.MenuView');
		}

	});
});
