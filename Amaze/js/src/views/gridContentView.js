define(['vendor/backbone', 'underscore', 'mixins/fragmentLoaderMixin', 'mixins/containerViewMixin', 'templates/expanding-grid-error', 'modules/animate'], function (Backbone, _, fragmentLoaderMixin, containerViewMixin, gridErrorTemplate, animate) {

	'use strict';

	return Backbone.View.extend({

		constructor: function () {

			_.merge(this, fragmentLoaderMixin, containerViewMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function(opts) {

			this.options = _.extend({
				transitionDuration: 500
			}, opts);

			this.$el.css({
				opacity: 0
			});
		},

		render: function(url) {

			return this.loadFragment(url, gridErrorTemplate, '[data-grid-content]').then(function ($content) {
				return this.initSubViews(this.$el, $content);
			}.bind(this));
		},

		show: function () {

			return animate(this.$el,{
				'opacity': 1
			}, {
				duration: this.options.transitionDuration
			}, this);
		},

		hide: function (clear) {

			return animate(this.$el, {
				'opacity': 0
			},
			{
				duration: this.options.transitionDuration
			}, this).then(function (view) {

				if(clear) {
					this.$el.empty();
				}

                this.removeSubViews();

                return view;

			}.bind(this));
		},

		remove: function () {

			this.removeSubViews();

			Backbone.Views.prototype.remove.apply(this, arguments);
		}
	});
});
