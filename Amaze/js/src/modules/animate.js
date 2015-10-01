define(['jquery', 'underscore', 'vendor/velocity'], function ($, _, Velocity) {

	'use strict';

	return function (el, props, opts, ctx) {

		var deferred = $.Deferred();

		Velocity.call(el, props, _.merge(opts || {}, {
			complete: function () {
				deferred.resolve(ctx || this);
			}
		}));

		return deferred.promise();
	};

});
