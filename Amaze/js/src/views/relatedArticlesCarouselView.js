define(['vendor/backbone', 'underscore', 'base', 'lib/owl.carousel', 'modules/globalDispatcher'], function (Backbone, _, base, owl, globalDispatcher) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				carouselOptions: {
					items: function(currentBp) {

						var config = {
							'base': 1,
							'medium': 2
						};

						switch (currentBp.name) {
							case 'base':
							case 'small':
								return config.base;
							default:
								return config.medium;
						}
					},
					loop: true,
					margin: 20,
					onInitialized: function (e) {

						var $carousel = $(e.target);

						// Remove grid classes from items and store original class for destroying
						$carousel.find('.related-articles__item').each(function() {
							var $el = $(this);
							$(this).data('original-class', $el.attr('class'));
							$el.attr('class', 'related-articles__item');
						});
					}
				}
			}, opts);

			this.$relatedArticleCarousel = this.$el.find('.related-articles__items');

			this.render();
			this.addEvents();
		},

		render: function() {

			if(!this.rendered) {

				this.rendered = true;

				this.createCarousel(base.breakpoints.getActiveBreakpoint());
			}

			return $.Deferred().resolve(this);
		},

		addEvents: function() {

			this.listenTo(globalDispatcher, 'change.Breakpoints', this.createCarousel);
		},

		createCarousel: function(currentBp) {

			if (this.$relatedArticleCarousel.children().length <= this.options.carouselOptions.items(currentBp)) {

				this.destroyCarousel();
				return;
			}

			// Destroy if item count has changed
			if (this.$relatedArticleCarousel.data('owl.carousel') != null &&
				this.$relatedArticleCarousel.data('owl.carousel').settings.items != this.options.carouselOptions.items(currentBp)) {
				this.destroyCarousel();
			}

			this.$relatedArticleCarousel.removeClass('grid').addClass('owl-carousel').owlCarousel(
				_.extend({}, this.options.carouselOptions, {
					items: this.options.carouselOptions.items(currentBp),
					dotsEach: true
				})
			);
		},

		destroyCarousel: function() {

			if (this.$relatedArticleCarousel.data('owl.carousel') != null) {

				// Reinstate original class on item
				this.$relatedArticleCarousel.find('.related-articles__item').each(function() {
					var $el = $(this);
					$el.attr('class', $el.data('original-class'));
				});

				this.$relatedArticleCarousel.trigger('destroy.owl.carousel').addClass('grid');
			}
		},

		remove: function () {

			this.destroyCarousel();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
