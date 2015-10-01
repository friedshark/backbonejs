define(['vendor/backbone', 'underscore', 'views/angleCarouselControlView', 'templates/angle-carousel-controls'], function (Backbone, _, AngleCarouselControlView, angleCarouselControlsTemplate) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({}, opts);
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				this.$el.html(angleCarouselControlsTemplate(this.collection.toJSON()));
				this.initSubViews();
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

			this.controlViews = _.zip(this.$el.find('[data-control]'), this.collection.models).map(function(slide, i) {

				return new AngleCarouselControlView({
					el: slide[0],
					model: slide[1]
				});
			});
		},

		removeSubViews: function () {

			this.controlViews.forEach(function removeControlView(controlView) {
				controlView.remove();
			});
		},

		remove: function() {

			this.removeSubViews();

			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});
});
