define(['vendor/backbone', 'underscore', 'views/articleGridItemView', 'templates/article-summary-blog-grid-item',
	'modules/animate'], function (Backbone, _, ArticleGridItemView, articleSummaryBlogTemplate,
		tweetTemplate, animate) {

	'use strict';

	return ArticleGridItemView.extend({

		getTemplate: function () {

			return $(articleSummaryBlogTemplate(this.model.toJSON()));
		}
	});
});
