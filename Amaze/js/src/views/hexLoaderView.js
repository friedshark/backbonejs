define(['vendor/backbone', 'underscore', 'templates/hex-loader-spinner'], function (Backbone, _, hexLoaderTemplate) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.render();
		},

		render: function () {

			var $template = $(hexLoaderTemplate());

			this.$el.replaceWith($template);
			this.setElement($template[0]);

			return $.Deferred().resolve(this);
		},

		attach: function ($parent) {

			$parent.append(this.$el);
		},

		detach: function () {

			this.$el.detach();
		}
	});
});
