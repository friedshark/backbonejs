define(['jquery', 'underscore', 'modules/analytics', 'vendor/jquery.form'], function ($, _, analytics) {

	'use strict';

	function send($form) {

		var deferred = $.Deferred();

		_.compose(_.partial(_.map, _, getAnalyticSet), getAnalyicsMap)($form.find('[data-analytics]').toArray());

		$form.ajaxSubmit({
            success: function (data) {
                if (data.status == 'success') {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            },
            error: function (err) {
            	deferred.reject(err);
            }
        });

		return deferred.promise();
	}

	function getAnalyicsMap(els) {

		return _.pairs(els.reduce(function(set, el) {

			var $el = $(el);
			var key = $el.data('analytics'),
				val = $el.is(':radio') || $el.is(':checkbox') ? ($el.prop('checked') ? $el.val() : null) : $el.val(),
				id = $el.attr('name') || $el.attr('id');

			if(key && id && val) {

				if(!set[key]) {
					set[key] = {};
				}

				set[key][id] = val;
			}

			return set;

		}, {}));
	}

	function getAnalyticSet (triggerProps) {

		var trigger = triggerProps[0],
			props = triggerProps[1];

		return _.pairs(props).map(_.partial(dispatchAnalytic, trigger));
	}

	function dispatchAnalytic(trigger, idVals) {

		analytics[trigger]({
			'Label': idVals[0],
			'Description': idVals[1]
		});
	}

	return {
		send: send
	}
});
