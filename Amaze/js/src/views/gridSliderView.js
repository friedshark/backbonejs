define(['vendor/backbone', 'underscore', 'base', 'lib/owl.carousel', 'modules/globalDispatcher'],
	function (Backbone, _, base, owl, globalDispatcher) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				carouselOptions: {
						items: function (currentBp) {

						var config = {
							'base': 1,
							'large': 2
						};

						switch (currentBp.name) {
							case 'base':
							case 'small':
							case 'medium':
								return config.base;
							default:
								return config.large;
						}
					},
					stagePadding: function (currentBp) {

						var config = {
							base: 0,
							small: 40,
							medium: 87,
							large: 100
						};

						switch (currentBp.name) {
							case 'base':
								return config.base;
							case 'small':
								return config.small;
							case 'medium':
								return config.medium;
							default:
								return config.large;
						}
					},
					loop: true,
					margin: 20,
					dotsEach: true,
					smartSpeed: 500
				}
			}, opts);

			this.$siteMaxWidthEl = this.$el.find('[data-site-max-width]');
			this.$siteMaxWidthEl.data('original-class', this.$siteMaxWidthEl.attr('class'));

			this.$clearClassElements = this.$el.find('[data-clear-class]');
			this.$clearClassElements.each(this.setOriginalClass);

			this.$items = this.$el.find('[data-carousel]');
			this.itemCount = this.$items.children().length;

			this.toggleClearClasses(false);

			this.addEvents();
			this.render();
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

		setOriginalClass: function () {

			var $el = $(this);

			$el.data('original-class', $el.attr('class'));
		},

		toggleClearClasses: function (on) {

			this.$clearClassElements.each(function () {

				var $el = $(this);

				$el.attr('class', (on ? $el.data('original-class') : $el.data('clear-class')));
			});
		},

		createCarousel: function(currentBp) {

			if (this.itemCount <= this.options.carouselOptions.items(currentBp)) {
				this.destroyCarousel();
				return;
			}

			this.destroyCarousel();

			this.toggleClearClasses(false);

			this.$items.addClass('owl-carousel').owlCarousel(
				_.extend({}, this.options.carouselOptions, {
					items: this.options.carouselOptions.items(currentBp),
					stagePadding: this.options.carouselOptions.stagePadding(currentBp)
				})
			);
		},

		destroyCarousel: function() {

			this.toggleClearClasses(true);

			if (this.$items.data('owl.carousel') != null) {

				this.$items.trigger('destroy.owl.carousel');
			}
		},

		remove: function () {

			this.destroyCarousel();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
