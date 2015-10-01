define(['vendor/backbone', 'underscore', 'vendor/hammer', 'modules/svgHelper', 'modules/performance', 'modules/polyAnimator', 'views/angleCarouselSlideView', 'views/angleCarouselTextView', 'templates/angle-carousel-svg', 'templates/angle-carousel-pagination'], function(Backbone, _, Hammer, svgHelper, performance, polyAnimator, AngleCarouselSlideView, AngleCarouselTextView, angleCarouselSvgTemplate, angleCarouselPaginationTemplate) {

	'use strict';

	var $win = $(window),
        DIRECTIONS = {
            '2': 1,
            '4': -1
        };

	return Backbone.View.extend({

		events: {
            'keydown': 'keyDirection',
		    'keydown [data-direction]': 'pageDirection',
		    'touchstart [data-direction]': 'pageDirection',
		    'mousemove': 'shiftDir',
			'mouseleave': 'reset',
			'click': 'select'
		},

		initialize: function(opts) {

			this.options = _.extend({
				activeClass: 'angle-carousel__slides--active',
				peekThreshold: 0.25,
				skewOffset: 30,
				skewDuration: 250
			}, opts);

			this.currentSlideIndex = 0;
			this.currentDir = 0;
			this.peekDir = 0;

			this.cachedProps = this.getCachedProps();

			this.addEvents();
		},

		addEvents: function() {

			this.resizer = performance.throttle(this.resize.bind(this), 250);
			this.listenTo(this.collection, 'change:active', this.change);

			this.hammer = new Hammer(this.$el[0]);
			this.hammer.on('swipe', this.swipe.bind(this));

			$win.on('resize', this.resizer);
		},

		render: function() {

			if(!this.rendered) {

				this.rendered = true;

			    var $svgFragment = $(new DOMParser().parseFromString(angleCarouselSvgTemplate(this.collection.toJSON()), 'image/svg+xml').documentElement);

				this.initSubViews($svgFragment.find('[id*="clip"]').toArray());
			    this.$mask = $svgFragment.find('#mask polygon');

				return $.when.apply(this, this.renderSlideViews($svgFragment.find('#container'))).then(this.appendElements($svgFragment).bind(this));
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function (masks) {

			this.slideViews = _.zip(this.collection.models, masks).map(function(slide, i) {

				return new AngleCarouselSlideView({
					id: i,
					model: slide[0],
					mask: slide[1]
				});
			});

		    this.angleCarouselTextView = new AngleCarouselTextView({
                collection: this.collection
            });
		},

		appendElements: function ($svgFragment) {

			return function () {

				var slides = Array.prototype.slice.call(arguments),
					parent = $svgFragment.find('#container');

				slides.forEach(function (view) {
					parent.prepend(view.$el);
				});

				slides[this.currentSlideIndex].show();

				this.$el.addClass(this.options.activeClass);
			    this.$el.html($svgFragment);

				this.resize();

			    this.angleCarouselTextView.render().then(function (view) {
			    	this.$el.append(view.$el);
			    }.bind(this));

			    this.$el.append(angleCarouselPaginationTemplate());

			    return this;
			}
		},

		renderSlideViews: function (parent) {

			return this.slideViews.map(function renderSubView(slideView) {
				return slideView.render();
			});
		},

		resize: function () {

			this.$el.css('height', $win.height());
			this.cachedProps = this.getCachedProps();

			this.skew(this.currentSlideIndex, true);
		},

		peek: function() {

			if(this.currentDir !== this.peekDir && !this.changing) {

				this.peekDir = this.currentDir;

				var targetIndex = this.getSlideIndex(this.currentSlideIndex + this.peekDir);

				if(this.peekDir) {
					this.arrangeSlides(targetIndex, this.currentSlideIndex, this.peekDir);
				}

				if(this.nextSlideIndex !== undefined) {
					this.slideViews[this.nextSlideIndex].peek(this.peekDir);
				}
			}
		},

		change: function (index) {

			if(this.currentSlideIndex !== index && !this.changing) {

				this.changing = true;

				this.skew(index);

				var dir = this.getDirection(index);

				this.arrangeSlides(index, this.currentSlideIndex, dir);
				this.slideViews[this.nextSlideIndex].reveal(dir).then(this.shiftSlides.bind(this));
			}
		},

		select: function(evt) {

			if (!this.changing) {

				if (this.peekDir) {
				    this.collection.models[this.getSlideIndex(this.currentSlideIndex + this.peekDir)].set('selected', true);
				}
			}
		},

		keyDirection: function (evt) {

		    if (evt.keyCode == 37 || evt.keyCode == 39) {

		        evt.preventDefault();
		        this.paginate(evt.keyCode == 37 ? -1: 1);
		    }
		},

		pageDirection: function (evt) {

		    if (!evt.keyCode || evt.keyCode == 13 || evt.keyCode == 32) {

		        evt.preventDefault();
		        this.paginate($(evt.currentTarget).data('direction'));

		        if(!evt.keyCode) {
		        	evt.stopPropagation();
		        }
		    }
		},

		swipe: function (swipe) {

		    this.paginate(DIRECTIONS[String(swipe.direction)]);
		},

		paginate: function (direction) {

		    if (!this.changing) {
		    	this.peekDir = 0;
		    	this.currentDir = 0;

		        this.collection.models[this.getSlideIndex(this.currentSlideIndex + Number(direction))].set('selected', true);
		    }
		},

		reset: function(evt) {

			this.currentDir = 0;

			this.peek();
		},

		skew: function (index, set) {

			if(set) {
				this.$mask.attr('points', this.getSkewPoints(index));
			}
			else {
				polyAnimator.animate(this.$mask, this.getSkewPoints(index), this.options.skewDuration);
			}
		},

		shiftSlides: function (newIndex) {

			this.slideViews[this.currentSlideIndex].hide();

			this.currentSlideIndex = newIndex;
			this.peekDir = 0;

			this.changing = false;

			if(this.collection.getActiveId() !== this.currentSlideIndex) {
				this.change(this.collection.getActiveId());
			}
			else if(!Modernizr.touch) {
				this.peek();
			}
		},

		arrangeSlides: function (lowerIndex, upperIndex, dir) {

			if(lowerIndex !== this.nextSlideIndex) {

				this.nextSlideIndex = lowerIndex;
				this.currentSlideIndex = upperIndex;

				this.slideViews[lowerIndex].setOrigin(dir);
				this.slideViews[lowerIndex].$el.insertAfter(this.slideViews[upperIndex].$el);
			}
		},

		shiftDir: function (evt) {

			var hitArea = (evt.pageX - this.cachedProps.elPos.left) / this.cachedProps.elWidth;
			this.currentDir = (hitArea >= 1 - this.options.peekThreshold) ? 1 : (hitArea <= this.options.peekThreshold) ? -1 : 0;

			this.peek();
		},

		getCachedProps: function(evt) {

			return {
				elPos: this.$el.position(),
				elWidth: this.$el.width(),
				elHeight: this.$el.height()
			};
		},

		getDirection: function (index) {

			if(this.currentSlideIndex == this.slideViews.length - 1 && !index) {
				return 1;
			}
			else if (!this.currentSlideIndex && index == this.slideViews.length - 1) {
				return -1;
			}

			return index < this.currentSlideIndex ? -1 : 1;
		},


		getSlideIndex: function (i) {

			return i >= this.slideViews.length ? 0 : i < 0 ? this.slideViews.length - 1 : i;
		},

		getSkewPoints: function (index) {

			var indexLength = this.slideViews.length - 1,
				midpoint = indexLength / 2,
				progress = (index - midpoint) / (indexLength / 2),
				offset = this.getSkewOffset(progress);

			return [0,0, 1,0, 1,1 - offset(), 0, 1 - offset(true), 0,0];
		},

		getSkewOffset: function (progress, inverse) {

			var offset = this.options.skewOffset / this.cachedProps.elHeight,
				calc = (offset - (progress * offset)) / 2;

			return function(inverse) {
				return inverse ? offset - calc : calc
			}.bind(this);
		},

		removeSubViews: function () {

			this.angleCarouselTextView.remove();

			if(this.slideViews) {

				this.slideViews.forEach(function removeSlideView(slideView) {
					slideView.remove();
				});
			}
		},

		remove: function() {

			this.hammer.off('swipe');
			$win.off('resize', this.resizer);

			this.removeSubViews();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
