define(['vendor/backbone', 'underscore', 'base', 'lib/owl.carousel', 'modules/globalDispatcher'], function (Backbone, _, base, owl, globalDispatcher) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				carouselOptions: {
					items: 1,
					loop: true,
					stagePadding: function (curr, prev) {
						var padding = {
							base: 28,
							small: 28,
							medium: 48
						};
						return padding[curr.name] ? padding[curr.name] : 100
					},
					smartSpeed: 500,
					nav: true,
					navText: [
						'<span class="icon icon--arrow-left"><span class="vh">prev</span></span>',
						'<span class="icon icon--arrow-right"><span class="vh">next</span></span>'
					]
				}
			}, opts);

			this.$imageGalleryCarouselItems = this.$el.find('.image-gallery-carousel__items');

			if (this.$imageGalleryCarouselItems.children().length < 2) return;

			// Sort out grid constraints
			this.$el.find('.image-gallery-carousel__site-max-element-width').removeClass('site__max-element-width');
			this.$el.find('.image-gallery-carousel__grid-item').attr('class', 'image-gallery-carousel__grid-item grid__item one-whole');

			this.createCarousel(base.breakpoints.getActiveBreakpoint(), base.breakpoints.getPrevBreakpoint());

			this.addEvents();
		},

		addEvents: function() {

			this.listenTo(globalDispatcher, 'change.Breakpoints', this.createCarousel);
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		createCarousel: function(currentBp, previousBp) {

			if (this.$imageGalleryCarouselItems.data('owl.carousel') != null) {
				this.$imageGalleryCarouselItems.trigger('destroy.owl.carousel');
			}

			this.$imageGalleryCarouselItems.addClass('owl-carousel').owlCarousel(
				_.extend({}, this.options.carouselOptions, {
					stagePadding: this.options.carouselOptions.stagePadding(currentBp, previousBp)
				})
			);
		}
	});
});
