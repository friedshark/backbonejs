define(['jquery', 'underscore',
    'models/filterModel', 'views/filterView',
    'views/ArticleGridView', 'vendor/handlebars'
    ], function ($, _,
        FilterModel, FilterView,
        ArticleGridView, Handlebars) {

	'use strict';

	return function ArticleGridController(opts) {

		var options = _.extend({}, opts),
            $el = $(options.el);

       	var filterTemplate = Handlebars.compile($el.find('[data-template="articleGridFilterFormTemplate"]').html()),
       		filterModel = new FilterModel($(filterTemplate()).find('[data-filter]').toArray().reduce(function (obj, filter) {
       			var filterId = $(filter).data('filter');
       			obj[filterId] = '';
       			return obj;
       		}, {})),
	        filterView = new FilterView({
	            model: filterModel,
                tmpl: filterTemplate
	        }),
            articleGridView = new ArticleGridView({
                el: $el.find('[data-view="articleGridView"]')[0],
                model: filterModel,
                tmplNoItems: Handlebars.compile($el.find('[data-template="articleGridNoItemsFoundTemplate"]').html()),
                tmplShowMore: Handlebars.compile($el.find('[data-template="showMoreTemplate"]').html())
            });

	    filterView.render().then(function(view) {
	        $el.find('[data-article-grid-form]').append(view.$el);
	    });
	};

});
