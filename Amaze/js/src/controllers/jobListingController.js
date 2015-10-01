define(['jquery', 'underscore',
    'models/filterModel', 'views/filterView',
    'views/JobListingView'
], function ($, _,
        FilterModel, FilterView,
        JobListingView) {

    'use strict';

    return function JobListingController(opts) {

        var options = _.extend({}, opts);

        var $el = $(options.el),
	    	filterModel = new FilterModel(),
	        filterView = new FilterView({
	            el: $el.find('[data-view="filterView"]')[0],
	            model: filterModel
	        }),
            jobListingView = new JobListingView({
                el: $el.find('[data-view="jobListingView"]')[0],
                model: filterModel,
                tmplNoVacancies: _.template($el.find('[data-view="jobListingNoVacanciesTemplate"]').html())
            });
    };
});
