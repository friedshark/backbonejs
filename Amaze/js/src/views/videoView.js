define(['vendor/backbone', 'underscore', 'modules/globalDispatcher', 'mixins/videoMixin', 'views/skewImageView', 'modules/animate'], function (Backbone, _, globalDispatcher, videoMixin, SkewImageView, animate) {

	'use strict';

	var $win = $(window);

	return Backbone.View.extend({

		events: {
			'click [data-expand]': 'expand',
			'click [data-collapse]': 'collapse'
		},

		constructor: function () {

			_.merge(this, videoMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function (opts) {

			this.options = _.extend({
				expandClass: 'media--expand',
				playerClass: 'media__player',
				frameClass: 'media__frame'
			}, opts);

			this.skewView = new SkewImageView({
				el: this.$el.find('[data-view="skewImage"]').get(0)
			});

			this.initVideo();
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		expand: function (evt) {

			evt.preventDefault();

			this.skewView.stop().then(function expandVideo() {

				this.transition({
					opacity: 0
				},
				this.expandStart.bind(this)).then(this.start.bind(this));

			}.bind(this));
		},

		expandStart: function () {

			this.$el.addClass(this.options.expandClass);
			globalDispatcher.trigger('open.VideoView');
		},

		expandProgress: function (origin, delta, prog) {

			$win.scrollTop(origin + (delta * prog));
		},

		collapse: function (evt) {

			if(evt) {
				evt.preventDefault();
			}

			this.removeVideo();

			this.transition({
				opacity: 1
			},
			this.collapseStart.bind(this)).then(this.reset.bind(this));
		},

		collapseStart: function () {

			globalDispatcher.trigger('close.VideoView');
		},

		transition: function (props, onStart, onProgress) {

			return animate(this.$inner, props, {
				begin: this.transitionStart(onStart).bind(this),
				duration: this.options.transitionDuration
			});
		},

		transitionStart: function (cb) {

			return function (el) {
				if(cb) {
					cb();
				}
			}
		},

		start: function () {

			this.startVideo().fail(this.collapse.bind(this));
		},

		reset: function () {

			this.$inner.css('height', 'auto');
			this.$el.removeClass(this.options.expandClass);

			this.skewView.start();
		},

		remove: function () {

			this.removeVideo();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
