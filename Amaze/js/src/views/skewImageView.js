define(['vendor/backbone', 'underscore', 'modules/ResponsiveImage', 'modules/performance', 'mixins/skewMixin'], function (Backbone, _, ResponsiveImage, performance, skewMixin) {

	'use strict';

	return Backbone.View.extend({

		constructor: function () {

			_.merge(this, skewMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function (opts) {

			this.options = _.extend({
				baseColour: '#63656a',
				outlineColour: '#ffffff'
			}, this.$el.data(), opts);

			this.initSkew();

			this.responsiveImage = new ResponsiveImage(this.options.srcset);
			this.responsiveImage.getCurrentImage().then(this.appendImage.bind(this));

			this.addEvents();
		},

		appendImage: function (objectUrl) {

			this.image = null;
			this.fillSkew();

			var $image = $(new Image());
			$image.on('load', _.compose(this.resize.bind(this), this.setImage.bind(this, $image)));

			$image[0].src = objectUrl;
		},

		setImage: function ($image) {

			$image.off('load');
			this.image = $image[0];
		},

		addEvents: function () {

			this.listenTo(this.responsiveImage, 'change.ResponsiveImage', this.appendImage);
		},

		fillSkew: function () {

			if(this.image) {
				this.ctx.save();
				this.ctx.clip();
				this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.width / this.image.width * this.image.height);
				this.ctx.restore();
			}
			else {
				this.ctx.fillStyle = this.options.baseColour;
				this.ctx.fill();
			}

			this.ctx.strokeStyle = this.options.outlineColour;
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		},

		remove: function () {

			this.responsiveImage.destroy();
			this.removeSkew();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
