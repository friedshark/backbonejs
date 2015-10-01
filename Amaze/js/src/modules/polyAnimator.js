define(['modules/animate'], function (animate) {

	'use strict';

	function createAnimationSequence(poly, points, duration, ctx) {

		return function animationSequence(i) {

			i = !i ? 0 : i;

			return animatePoly(poly, points[i], duration / points.length).then(function animationStep() {
				if(++i < points.length) {
					return animationSequence(+i);
				}

				return(ctx.model.get('id'));
			});
		};
	}

	function animatePoly(poly, endPoints, duration) {

		var startPoints = poly.attr('points').split(/[, ]+/g).map(function (coord) {
				return +coord;
			}),
			delta = getPolyDelta(startPoints, endPoints);


		return animate(poly, {
			tween: 100
		}, {
			progress: animateProgress(poly, startPoints, delta),
			duration: duration
		});
	}

	function animateProgress(poly, startPoints, delta) {

		return function (el, prog) {

			poly.attr({
				points: getPolyShift(startPoints, delta, prog)
			});
		};
	}

	function getPolyDelta(from, to) {

		return from.map(function getDelta(point, i) {
			return to[i] - point;
		});
	}

	function getPolyShift(from, delta, prog) {

		return from.map(function getShift(point, i) {
			return point + (delta[i] * prog);
		});
	}

	return {
		createAnimationSequence: createAnimationSequence,
		animate: animatePoly
	};
});

