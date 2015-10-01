define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	return function ViewCycler (items) {

		var cycling = false,
			resetting = false,
			currentIndex = 0,
			promise;

		function recycle (index) {

			if(items.length < 2) {
				return items[index].show();
			}

			return items[index].show().then(items[index].hide.bind(items[index])).then(function (view) {

				currentIndex = view.id + 1 < items.length ? view.id + 1 : 0;

				if(cycling) {
					return recycle(currentIndex);
				}
				else {
					return $.Deferred().reject();
				}

			}.bind(this));
		};

		this.start = function (i) {

			i = i || currentIndex;

			cycling = true;
			promise = recycle(i < items.length ? i : 0);
			return this;
		}

		this.stop = function () {
			cycling = false;
		}

		this.reset = function() {

			if(!resetting) {
				resetting = true;
				this.stop();

				promise.fail(function () {
					resetting = false;
					this.start();
				}.bind(this));
			}
		}
	};
});
