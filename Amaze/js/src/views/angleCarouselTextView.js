define(['vendor/backbone', 'underscore', 'modules/scrollAnchor', 'templates/angle-carousel-text', 'modules/animate'], function (Backbone, _, scrollAnchor, angleCarouselTextTemplate, animate) {

	'use strict';

	return Backbone.View.extend({

		className: 'angle-carousel__body',

		events: {
			'click [data-cta]': 'follow'
		},

		initialize: function (opts) {

			this.options = _.extend({
				shiftDelta: 100
			}, opts);

			this.$inner = $('<div/>');
			this.$el.append(this.$inner);

			this.$inner.attr('aria-live', 'polite');

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.collection, 'change', this.render);
		},

		render: function (model) {

			if (model && model.changed.selected) {

				return this.hide().then(function () {

					this.$inner.html(angleCarouselTextTemplate(model.toJSON()));

					return animate(this.$inner, {
						translateY: 0,
						opacity: 1
					});

				}.bind(this));
			}

			return $.Deferred().resolve(this);
		},

		hide: function () {

			return animate(this.$inner, {
				translateY: this.options.shiftDelta,
				opacity: 0
			});
		},

		follow: function (evt) {

			evt.stopPropagation();

			var location = $(evt.currentTarget).attr('href');

			if(_.startsWith(location, '#')) {
				evt.preventDefault();
				scrollAnchor.trigger(location.substr(1));
			}
		}
	});
});
