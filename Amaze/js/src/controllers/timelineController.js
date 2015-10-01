define(['underscore', 'jquery', 'views/skewGradientView', 'views/timelineView'], function (_, $, SkewGradientView, TimelineView) {

	'use strict';

	return function TimelineController(opts) {

		var options = _.extend({}, opts),
			$el = $(options.el),
			timelineView = new TimelineView({
			    el: $el.find('[data-view="timelineView"]')[0],
			    url: $el.data('urljson')
			});

		timelineView.render().then(function(){

			var skewGradientView = new SkewGradientView({
                el: $el.find('[data-view="skewGradientView"]')[0]
            });
		});
	};

});
