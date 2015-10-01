define(['vendor/backbone', 'underscore', 'modules/animate'], function (Backbone, _, animate) {

	'use strict';

	return Backbone.View.extend({

		attributes: {
			'id': 'overlay',
			'class': 'brand__overlay',
			'aria-live': 'polite'
		},

		events: {
			'click [data-overlay-close]': 'close'
		},

		initialize: function (opts) {

			this.options = _.extend({
				errorClass: 'brand__overlay--error',
				transitionDuration: 500
			}, opts);

			this.addEvents();
			this.hide(true);
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:overlay', this.render);
		},

		render: function (model) {

			if (model && model.get('overlay')) {
				return this.show();
			}
			else if (this.active) {
				return this.hide();
			}

			return $.Deferred().resolve(this);
		},

		show: function () {

			this.$el.html(this.options.template(this.model.toJSON()));
			this.$el.toggleClass(this.options.errorClass, !!~this.model.get('overlay').indexOf('Error'));

			this.active = true;
			this.toggleAria(true);

			return this.animate(1);
		},

		hide: function (instant) {

			this.toggleAria(false);
			this.active = false;

			return this.animate(0, instant);
		},

		animate: function (opacity, instant) {

			return animate(this.$el, {
				opacity: opacity
			}, {
				display: opacity ? 'block': 'none',
				duration: instant ? 0 : this.options.transitionDuration
			}, this);
		},

		close: function () {

			this.model.set('overlay', null);
		},

		toggleAria: function (visible) {

			this.$el.attr('aria-hidden', !visible);
		},
	});
});
