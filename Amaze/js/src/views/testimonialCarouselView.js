define(['vendor/backbone', 'underscore', 'lib/owl.carousel'], function (Backbone, _, owl) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				carouselOptions: {
					items: 1,
                	smartSpeed: 500,
                	loop: true
            	}
			}, opts);

		    this.$testimonialList = this.$el.find('.testimonial-carousel__items');

		    if (this.$testimonialList.children().length < 2) return;

            this.render();
		},

        render: function () {

           	if(!this.rendered) {

				this.rendered = true;

	            this.$testimonialList.addClass('owl-carousel').owlCarousel(this.options.carouselOptions);
			}

			return $.Deferred().resolve(this);
		}
	});
});
