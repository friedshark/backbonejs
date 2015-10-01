define(['vendor/backbone', 'underscore', 'modules/performance', 'mixins/skewMixin'], function (Backbone, _, performance, skewMixin) {

	'use strict';

	var $win = $(window);

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				deviceShowcaseAnimateClass: 'device-showcase--animate',
				deviceShowcaseVisiblePercentage: 33
			}, opts);

			this.addEvents();

			this.resize();
		},

		addEvents: function () {

			this.resizer = performance.throttle(this.resize.bind(this), 250);
			this.scroller = performance.scroll(this.checkPosition.bind(this)).start();

			$win.on('resize', this.resizer);
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		resize: function () {

			if (this.animated)
				return;

			this.calculatedHeights = {
				el: this.$el.height(),
				win: window.innerHeight ? window.innerHeight : $win.height()
			}

			performance.raf(this.checkPosition.bind(this))();
		},

		checkPosition: function () {

			if (this.animated)
				return;

			var distance = ($win.scrollTop() + this.calculatedHeights.win) - this.$el.offset().top,
				percentage = (distance / this.calculatedHeights.el) * 100;

			if (Math.round(percentage) >= this.options.deviceShowcaseVisiblePercentage && !this.animated) {
				this.$el.addClass(this.options.deviceShowcaseAnimateClass);
				this.animated = true;
			}
		}

	});
});

