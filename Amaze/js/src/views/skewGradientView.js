define(['vendor/backbone', 'underscore', 'modules/performance', 'mixins/skewMixin'], function (Backbone, _, performance, skewMixin) {

	'use strict';

	return Backbone.View.extend({

		constructor: function () {

			_.merge(this, skewMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function (opts) {

			this.options = _.extend({}, this.$el.data(), opts);

			this.initSkew();

			if(this.options.pattern) {
				this.loadTexture(this.options.pattern);
			}

			if (this.ctx) {
			    this.$el.parent().children('.bg_no_js').remove();
			}
		},

		loadTexture: function (src) {

			if(!src) return;

			this.image = new Image();

			this.image.addEventListener('load', this.appendImage.bind(this));
			this.image.src = src;
		},

		appendImage: function () {

			this.image.removeEventListener('load', this.appendImage);
			this.pattern = this.ctx.createPattern(this.image, 'repeat');

			performance.raf(this.appendTexture.bind(this))();
		},

		appendTexture: function () {

			this.ctx.fillStyle = this.pattern;
			this.ctx.fill();
		},

		fillSkew: function (progress) {

			this.ctx.fillStyle = this.options.baseColour;
			this.ctx.fill();

			this.ctx.fillStyle = this.getRadialGradient(
				this.getRelativeCoord({ x: 1.25, y: 1.25 }),
				this.getRelativeCoord({ x: 1.25, y: -0.25 }),
				this.getRelativeCoord({ x: -0.25, y: -0.25 }),
				progress, this.options.primaryColour);
			this.ctx.fill();

			this.ctx.fillStyle = this.getRadialGradient(
				this.getRelativeCoord({ x: -0.25, y: -0.25 }),
				this.getRelativeCoord({ x: -0.25, y: 1.25 }),
				this.getRelativeCoord({ x: 1.25, y: 1.25 }),
				progress, this.options.secondaryColour);
			this.ctx.fill();

			if(this.pattern) {
				this.appendTexture();
			}
		},

		getQuadraticBezierPoint: function (sPt, cPt, ePt, progress) {

			return {
				x: Math.pow(1 - progress, 2) * sPt.x + 2 * (1 - progress) * progress * cPt.x + Math.pow(progress, 2) * ePt.x,
				y: Math.pow(1 - progress, 2) * sPt.y + 2 * (1 - progress) * progress * cPt.y + Math.pow(progress, 2) * ePt.y
			};
		},

		getRadialGradient: function (sPt, cPt, ePt, progress, colour) {

			var curve = this.getQuadraticBezierPoint.apply(this, Array.prototype.slice.apply(arguments)),
				radialGradient = this.ctx.createRadialGradient(curve.x, curve.y, 0, curve.x, curve.y, this.canvas.width);

			radialGradient.addColorStop(0, this.getRGBA(colour, 0.3));
			radialGradient.addColorStop(1, this.getRGBA(colour, 0));

			return radialGradient;
		},

		getRGBA: function (hex, alpha) {

			hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

			return result ? 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + alpha + ')' : null;
		},

		remove: function () {

			this.removeSkew();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});

