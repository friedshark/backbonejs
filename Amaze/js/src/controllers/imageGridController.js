define(['jquery', 'underscore',
    'views/ImageGridView', 'vendor/handlebars'
    ], function ($, _,
        ImageGridView, Handlebars) {

	'use strict';

	return function ImageGridController(opts) {

	    var options = _.extend({}, opts),
            $el = $(options.el);

	    var imageGridView = new ImageGridView({
            el: $el.find('[data-view="imageGridView"]')[0],
            tmplShowMore: Handlebars.compile($el.find('[data-template="showMoreTemplate"]').html())
        });
	};

});
