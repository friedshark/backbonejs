define(['jquery', 'underscore',
	'models/filterModel',
	'views/ArticleGridView', 'vendor/handlebars'
	], function ($, _,
		FilterModel,
		ArticleGridView, Handlebars) {

	'use strict';

	return function BlogArticleGridController(opts) {

		// Note: This is a temporary implementation, when history integration is complete remove this controller and use ArticleGridController in its place (with filters).
		var options = _.extend({}, opts),
			$el = $(options.el);

		var filterModel = new FilterModel({
				categories: [],
				month: '',
				year: ''
			}),
			articleGridView = new ArticleGridView({
				el: $el.find('[data-view="articleGridView"]')[0],
				model: filterModel,
				tmplNoItems: Handlebars.compile($el.find('[data-template="articleGridNoItemsFoundTemplate"]').html()),
				tmplShowMore: Handlebars.compile($el.find('[data-template="showMoreTemplate"]').html())
			});
	};

});
