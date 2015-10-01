define(['vendor/backbone', 'underscore', 'mixins/audioMixin', 'templates/brand-audio', 'modules/animate'], function (Backbone, _, audioMixin, brandAudioTemplate, animate) {

	'use strict';

	return Backbone.View.extend({

		attributes: {
			'id': 'audio',
			'class': 'brand__audio media'
		},

		constructor: function () {

			_.merge(this, audioMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.addEvents();
			this.hide(true);
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:mode', this.render);
			this.listenTo(this.model, 'change:listening', this.render);
		},

		render: function (model) {

			if (model && model.get('mode') == 'listening' && model.get('listening') == model.MEDIA_STATES.ACTIVE) {

				if (!this.$audio) {

					this.$el.html(brandAudioTemplate(_.merge(this.model.toJSON(), {
						audioUrl: this.options.audioUrl
					})));
					this.initAudio();

					this.startAudio();
				}

				return this.show();
			}
			else if (this.active) {
				return this.hide();
			}

			return $.Deferred().resolve(this);
		},

		show: function () {

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
				display: opacity ? 'block' : 'none',
				duration: instant ? 1 : this.options.transitionDuration
			}, this);
		},

		toggleAria: function (visible) {

			this.$el.attr('aria-hidden', !visible);
		},

		remove: function () {

			this.removeAudio();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
