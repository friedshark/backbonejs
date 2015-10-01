define(['vendor/backbone', 'underscore',
	'views/ImageGridItemView', 'views/showMoreView'],
	function (Backbone, _,
		ImageGridItemView, ShowMoreView) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.$imageGrid = this.$el.find('[data-image-grid]');
			this.showMoreUrl = this.$imageGrid.data('image-grid-show-more-url');

			// Templates
			this.$showMoreEl = $(this.options.tmplShowMore());

			this.initialiseShowMore();

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.$showMoreView, 'dataLoaded.ShowMore', this.processShowMoreData);
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		renderSubViews: function(views) {

			return function() {

				views.forEach(function(view, idx) {
					view.render();
				});
			}
		},

		initialiseShowMore: function () {

			this.hidePagination();

			this.$showMoreView = new ShowMoreView({
				el: this.$showMoreEl
			});

			if (!this.showMoreUrl) {
				return;
			}

			this.$showMoreView.setUrl(this.showMoreUrl);

			this.$el.append(this.$showMoreView.$el);
		},

		hidePagination: function() {

			this.$el.find('[data-image-grid-pagination]').remove();
		},

		configureShowMore: function() {

			// Check if we have a showMoreUrl
			if (!this.showMoreUrl) {
				this.$showMoreView.hide();
				return;
			}

			this.$showMoreView.show();

			this.$showMoreView.setUrl(this.showMoreUrl);
		},

		processShowMoreData: function (jsonData) {

			var items = jsonData.items.map(function(item) {

				return new ImageGridItemView({
					model: item
				});
			});

			this.showMoreUrl = jsonData.showMoreUrl;

			this.$imageGrid.append(items.map(function(item) { return item.el; }));

			this.renderSubViews(items).bind(this)();

			this.configureShowMore();
		}

	});
});
