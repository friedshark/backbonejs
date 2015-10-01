define(['vendor/backbone', 'underscore', 'modules/svgHelper', 'modules/responsiveImage', 'modules/polyAnimator', 'templates/angle-carousel-slide', 'vendor/velocity'], function (Backbone, _, svgHelper, ResponsiveImage, polyAnimator, angleCarouselSlideTemplate) {

    'use strict';

    window.URL = window.URL || window.webkitURL;

	var	RESET_POINTS = {
			'-1': [
				[0,0, 0.15,0, 0,1, 0,1, 0,0],
				[0,0, 0,0, 0,1, 0,1, 0,0],
			],
			'1': [
				[0.85,0, 1,0, 1,1, 1,1, 0.85,0],
				[1,0, 1,0, 1,1, 1,1, 1,0]
			]
		},
		PEEK_POINTS = {
			'-1': [
				[0,0, 0.15,0, 0,1, 0,1, 0,0],
				[0,0, 0.15,0, 0.25,1, 0,1, 0,0]
			],
			'1': [
				[0.85,0, 1,0, 1,1, 1,1, 0.85,0],
				[0.85,0, 1,0, 1,1, 0.75,1, 0.85,0]
			]
		},
		DISMISS_POINTS = {
			'-1': [
				[0,0, 0.65,0, 0.28,1, 0,1, 0,0],
				[0,0, 0.8,0, 1,1, 0,1, 0,0],
				[0,0, 1,0, 1,1, 0,1, 0,0]
			],
			'1': [
				[0.35,0, 1,0, 1,1, 0.72,1, 0.35,0],
				[0.2,0, 1,0, 1,1, 0,1, 0.2,0],
				[0,0, 1,0, 1,1, 0,1, 0,0]
			]
		};

	return Backbone.View.extend({

		initialize: function(opts) {

			this.options = _.extend({
				peekDuration: 250,
				dismissDuration: 750,
				activeClass: 'angle-carousel__slide--active'
			}, opts);

			this.responsiveImage = new ResponsiveImage(this.model.get('srcset'));
			this.$mask = $(svgHelper.getSVGTag('polygon', this.options.mask));
		},

		addEvents: function () {

			this.responsiveImage.on('change.ResponsiveImage', this.changeImage.bind(this));
		},

		render: function() {

		    if(!this.rendered) {

		    	this.rendered = true;

			    return this.responsiveImage.getCurrentImage().then(function (response) {

			        var svgFragment = new DOMParser().parseFromString(angleCarouselSlideTemplate(_.merge(this.model.toJSON(), {
			            image: response
			        })), 'image/svg+xml');


			        var $template = $(svgFragment.documentElement);

			        this.$el.replaceWith($template);
			        this.setElement($template[0]);

			        this.$image = this.$el.find('image');
			        this.addEvents();

			        return this;

			    }.bind(this));
			}

			return $.Deferred().resolve(this);
		},

		changeImage: function (objectUrl) {

			this.$image.attr('xlink:href', objectUrl);
		},

		peek: function(dir, set) {

			this.$mask.velocity('stop');

			var points = dir ? PEEK_POINTS[dir] : this.origin;

			if(set) {
				this.$mask.attr('points', points[points.length - 1]);
			}
			else {
				polyAnimator.createAnimationSequence(this.$mask, points, this.options.peekDuration, this)();
			}
		},

		show: function () {

			svgHelper.addClass(this.el, this.options.activeClass);
		},

		hide: function () {

			svgHelper.removeClass(this.el, this.options.activeClass);
		},

		reveal: function (dir) {

			this.$mask.velocity('stop');

			return polyAnimator.createAnimationSequence(this.$mask, DISMISS_POINTS[dir], this.options.dismissDuration, this)().then(function completeDismiss(id) {
				this.show();
				return id;
			}.bind(this));
		},

		setOrigin: function (dir) {

			this.origin = RESET_POINTS[dir];
			this.$mask.attr('points', this.origin[this.origin.length - 1]);
		},

		remove: function() {

			this.responsiveImage.off('change.ResponsiveImage');

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
