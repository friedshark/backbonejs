define(['vendor/backbone', 'underscore', 'modules/animate'], function (Backbone, _, animate) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				transitionDuration: 1000,
				transitionDelay: 3000
			}, opts);

			this.$els = this.$('[data-tweet-content], [data-tweet-meta]');

			this.render();
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		show: function () {

			return animate(this.$els, {
				translateY: [0, 20],
				opacity: 1
			}, {
				duration: this.options.transitionDuration,
				display: 'block'
			}, this);
		},

		hide: function () {

			return animate(this.$els, {
				translateY: [-20, 0],
				opacity: 0
			}, {
				duration: this.options.transitionDuration,
				delay: this.options.transitionDelay,
				display: 'none'
			}, this);
		}
	});
});
