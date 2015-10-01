define(['underscore', 'modules/performance', 'modules/animate'], function (_, performance, animate) {

	'use strict';

	var $win = $(window);

	var ANGLES = {
		both: 'both',
		bottom: 'bottom',
		top: 'top'
	};

	return {

		initSkew: function () {

			_.defaults(this.options, {
				skewOffset: 30,
				tweenDuration: 500,
				angles: ANGLES.both
			});

			this.canvas = this.el;
			this.ctx = this.canvas.getContext('2d');

			this.resize();
			this.addSkewEvents();
		},

		addSkewEvents: function () {

			this.resizer = performance.throttle(this.resize.bind(this), 1000);
			this.scroller = performance.scroll(this.render.bind(this)).start();

			$win.on('resize', this.resizer);
		},

		render: function () {

			this.draw(this.getProgess());
		},

		start: function () {

			this.scroller.stop();

			var offset = this.getOffset(this.getProgess(true)),
				toCoords = this.getCoords(0, 0),
				fromCoords = this.getCoords(offset(), offset(true)),
				deferred = $.Deferred();

			return this.tween(toCoords, fromCoords).then(function restartScroller() {
				this.scroller.start();
			}.bind(this));
		},

		stop: function () {

			this.scroller.stop();

			var offset = this.getOffset(this.getProgess(true)),
				toCoords = this.getCoords(offset(), offset(true)),
				fromCoords = this.getCoords(0, 0),
				deferred = $.Deferred();

			return this.tween(toCoords, fromCoords);
		},

		tween: function (toCoords, fromCoords) {

			return animate(this.$el, {
				tween: 100
			}, {
				progress: this.tweenProgress(this.getDeltas(toCoords, fromCoords)).bind(this),
				duration: this.options.tweenDuration
			});
		},

		tweenProgress: function (deltas) {

			return function (el, progress) {

				var coords = deltas.map(function getDeltaCoords(deltaPair) {
					return {
						x: deltaPair[0].x + (deltaPair[1].x * progress),
						y: deltaPair[0].y + (deltaPair[1].y * progress)
					}
				});

				this.drawSkew.apply(this, coords.concat(1));
			}
		},

		resize: function () {

			this.canvas.width = this.$el.width();
			this.canvas.height = this.$el.height();

			var progress = this.getProgess(true);
			performance.raf(this.draw.bind(this))(progress);
		},

		draw: function (progress) {

			if (progress >= -1 && progress <= 1) {

				var offset = this.scroller.active ? this.getOffset(progress) : function () { return 0; };
				this.drawSkew.apply(this, this.getCoords(offset(), offset(true)).concat((progress + 1) / 2));
			}
		},

		drawSkew: function (ptA, ptB, ptC, ptD, progress) {

			this.ctx.save();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.moveTo.apply(this.ctx, _.values(this.getRelativeCoord(ptA)));
			this.ctx.lineTo.apply(this.ctx, _.values(this.getRelativeCoord(ptB)));
			this.ctx.lineTo.apply(this.ctx, _.values(this.getRelativeCoord(ptC)));
			this.ctx.lineTo.apply(this.ctx, _.values(this.getRelativeCoord(ptD)));

			if(this.fillSkew) {
				this.fillSkew(progress);
			}
			else {
				this.ctx.fill();
			}

			this.ctx.restore();
		},

		getCoords: function (base, inverse) {

			return [
				{ x: 0, y: this.options.angles == ANGLES.both || this.options.angles == ANGLES.top ? base : 0 },
				{ x: 1, y: this.options.angles == ANGLES.both || this.options.angles == ANGLES.top ? inverse : 0 },
				{ x: 1, y: this.options.angles == ANGLES.both || this.options.angles == ANGLES.bottom ? 1 - inverse : 1 },
				{ x: 0, y: this.options.angles == ANGLES.both || this.options.angles == ANGLES.bottom ? 1 - base: 1 }
			];
		},

		getDelta: function (from, to) {

			if(from.length != to.length) return;

			return to.map(function (coord, i) {
				return {
					x: coord.x - from[i].x,
					y: coord.y - from[i].y
				}
			});
		},

		getDeltas: function (fromCoords, toCoords) {

			var delta = this.getDelta(fromCoords, toCoords);

			return _.zip(fromCoords, delta);
		},

		getOffset: function (progress, inverse) {

			var offset = this.options.skewOffset / this.canvas.height,
				calc = (offset - (progress * offset)) / 2;

			return function(inverse) {
				return inverse ? offset - calc : calc
			}.bind(this);
		},

		getProgess: function (restrict) {

			var scrollOffset = this.$el.offset().top - $win.scrollTop(),
				viewOccupancy = (this.canvas.height - scrollOffset) / this.canvas.height,
				progress = (viewOccupancy - 1);

			return restrict ? progress < -1 ? -1 : progress > 1 ? 1 : progress : progress;
		},

		getRelativeCoord: function (point) {

			return {
				x: Math.round(point.x * this.canvas.width),
				y: Math.round(point.y * this.canvas.height)
			};
		},

		removeSkew: function () {

			$win.off('resize', this.resizer);
			this.scroller.stop();
		}
	};
});

