define(['vendor/backbone', 'underscore', 'templates/search-overlay-results-item', 'templates/search-overlay-no-results', 'templates/search-overlay-show-more', 'templates/_show-more'], function (Backbone, _, searchOverlayResultsItem, searchOverlayNoResults, searchOverlayShowMoreTemplate) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				invisibleClass: 'searchoverlay__result--invisible'
			}, opts);
		},

		render: function (results, more) {

			var view = this;

			this.$el.empty();

			if (results.length > 0) {

				_.forEach(results, function (result, i) {

					var resultItem = $(searchOverlayResultsItem(result));

					resultItem.addClass(this.options.invisibleClass);

					this.$el.append(resultItem);

					_.delay(function () {

						resultItem.removeClass(view.options.invisibleClass);
					}, (i + 1) * 100);

				}, this);

				if(more) {
					this.$el.append(searchOverlayShowMoreTemplate());
				}

				return $.Deferred().resolve(this);
			} else {

				var noResults = $(searchOverlayNoResults());

				noResults.addClass(this.options.invisibleClass);

				this.$el.html(noResults);

				_.delay(function () {

					noResults.removeClass(view.options.invisibleClass);
				}, 100);

				return $.Deferred().resolve(this);
			}
		}
	});
});
