define(['vendor/backbone', 'underscore', 'templates/media-video-controls'], function (Backbone, _, mediaControlsTemplate, performance) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

		    this.options = _.extend({}, opts);
		},

		render: function () {

			this.$el.html(mediaControlsTemplate(_.extend(this.model.toJSON(), {
				controls: false
			})));

			return $.Deferred().resolve(this);
		}
	});
});
