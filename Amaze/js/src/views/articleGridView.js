define(['vendor/backbone','underscore',
	'modules/jitRequire',
	'collections/articleGridItemsCollection', 'models/articleGridItemModel', 'views/articleGridItemView', 'views/articleGridTweetItemView', 'views/articleGridBlogItemView',
	'views/showMoreView', 'modules/animate', 'views/disqusCommentCount'],
	function (Backbone, _,
		jitRequire,
		ArticleGridItemsCollection, ArticleGridItemModel, ArticleGridItemView, ArticleGridTweetItemView, ArticleGridBlogItemView,
		ShowMoreView, animate, commentCount) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.filterLabels = Object.keys(this.model.attributes);
			var items = this.createGridItemViewsAndModels(this.$el);

			this.itemModels = new ArticleGridItemsCollection(_.pluck(items, 'model'));
			this.itemViews = _.pluck(items, 'view');

			this.$articleGrid = this.$el.find('[data-article-grid]');

			this.$noItemsEl = $(this.options.tmplNoItems());
			this.$showMoreEl = $(this.options.tmplShowMore());

			this.showMoreTags = this.$articleGrid.data('article-grid-show-more-tags');
			this.showMoreUrl = this.$articleGrid.data('article-grid-show-more-url');

			this.initialiseShowMore();
			this.processModelChange(this.model);

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change', this.processModelChange);
			this.listenTo(this.$showMoreView, 'dataLoaded.ShowMore', this.processShowMoreData);
		},

		render: function (itemCount) {

			if (itemCount) {
				this.$noItemsEl.detach();
			}
			else {
				this.$el.append(this.$noItemsEl);
			}

			return $.Deferred().resolve(this);
		},

		createGridItemViewsAndModels: function ($elementToSearch) {

			return $.makeArray($elementToSearch.find('[data-grid-item]')).map(function(el) {

				var $el = $(el),
					modelProto = _.merge(this.filterLabels.reduce(function (obj, filter) {
					    obj[filter] = $el.data(filter);
					    if (obj[filter] && obj[filter].length > 0) {
					        obj[filter] = obj[filter].split(',');
					    } else {
					        obj[filter] = new Array();
					    }
						return obj;
					}, {}), {
						id: $el.data('id'),
						display: $el.data('display'),
						type: $el.data('type'),
						visible: true
					}),
					itemModel = new ArticleGridItemModel(modelProto),
					itemView = ArticleGridItemViewFactory().create(itemModel.get('type'), {
						el: el,
						model: itemModel,
						rendered: true
					});

				return {
					model: itemModel,
					view: itemView
				};

			}.bind(this));
		},

		modelEmpty: function (model) {

			return _.every(this.filterLabels.map(function (filter) {
				return model.get(filter);
			}), function (filter) {
				return filter == '';
			});
		},

		processModelChange: function(model) {

			var itemCount = this.setModels(model);

			this.initSubViews(this.itemViews, itemCount).bind(this)();
			this.configureShowMore(model);
			this.displayItems.bind(this)();

			if (itemCount === 0 && this.$showMoreView.visible()) {
				this.$showMoreView.getData();
				return;
			}

			this.render(itemCount);
		},

		hideItems: function() {

			this.$el.css({
				opacity: 0
			});
		},

		displayItems: function() {

			this.$articleGrid.addClass('article-grid__flex--show');

			return animate(this.$el, {
				opacity: 1
			},
			{
				display: 'block',
				duration: 500
			});
		},

		initSubViews: function(views, itemCount) {

			return function() {

				var activeCounter = 0;
				var slotCount = 2;

				views.forEach(function(view, idx) {

					if (!view.visible()) {
					    view.render();
						return;
					}

					activeCounter++;

					var viewDesiredDisplay = view.desiredDisplay();

					if (viewDesiredDisplay === 'half') {
						slotCount -= 1;
					} else {
						slotCount -= 2;
					}

					if (slotCount < 0) {
						view.resizeToHalf();
					}

					if ((idx === views.length - 1 || activeCounter === itemCount)
						&& viewDesiredDisplay === 'half' && slotCount > 0) {

						view.resizeToFull();
					}

					if (slotCount <= 0) {
						slotCount = 2;
					}

					view.render();
				});
			}
		},

		setModels: function (model) {

			return this.itemModels.setFilters(this.filterLabels.reduce(function (obj, filter) {
				obj[filter] = model.get(filter);
				return obj;
			}, {}));
		},

		initialiseShowMore: function () {

			this.hidePagination();

			this.$showMoreView = new ShowMoreView({
				el: this.$showMoreEl
			});

			if (!this.showMoreTags || !this.showMoreUrl) {
				return;
			}

			this.$el.append(this.$showMoreView.$el);
		},

		hidePagination: function() {

			this.$el.find('[data-article-grid-pagination]').remove();
		},

		configureShowMore: function(model) {

			if (!this.showMoreTags) {
				this.$showMoreView.hide();
				return;
			}

            var arrAdditionalData = this.showMoreTags.toString().split(',');

			if (!this.modelEmpty(model)) {

				var without = _.without.apply(null, [arrAdditionalData].concat(this.filterLabels.map(function (filter) {
					return model.get(filter);
				}))).length;

                var containGroup = true;

                if (!!model.get(this.filterLabels[0]) && model.get(this.filterLabels[0]).toString().length > 0) {
                    if (!!model.get(this.filterLabels[1]) && model.get(this.filterLabels[1]).toString().length > 0) {
                        containGroup = _.contains(arrAdditionalData, model.get(this.filterLabels[0]).toString() + "-" + model.get(this.filterLabels[1]).toString());
                        if (!!model.get(this.filterLabels[2]) && model.get(this.filterLabels[2]).toString().length > 0) {
                            containGroup = _.contains(arrAdditionalData, model.get(this.filterLabels[0]).toString() + "-" + model.get(this.filterLabels[1]).toString() + "-" + model.get(this.filterLabels[2]).toString().length);
                        }
                    } else if (!!model.get(this.filterLabels[2]) && model.get(this.filterLabels[2]).toString().length > 0) {
                        containGroup = _.contains(arrAdditionalData, model.get(this.filterLabels[0]).toString() + "-" + model.get(this.filterLabels[2]).toString().length);
                    }
                } else if (!!model.get(this.filterLabels[1]) && model.get(this.filterLabels[1]).toString().length > 0) {
                    if (!!model.get(this.filterLabels[2]) && model.get(this.filterLabels[2]).toString().length > 0) {
                        containGroup = _.contains(arrAdditionalData, model.get(this.filterLabels[1]).toString() + "-" + model.get(this.filterLabels[2]).toString().length);
                    }
                }

                // Check to see if we need to show 'show more'
                if (without >= arrAdditionalData.length || !containGroup) {
                    this.$showMoreView.hide();
                    return;
                }
            }

			this.$showMoreView.show();

			var replaceMap = _.merge({
				"{exclude}": this.itemModels.pluck('id').join('~')
			}, this.filterLabels.reduce(function(obj, filter) {
				obj['{' + filter + '}'] = model.get(filter);
				return obj;
			}, {}));

			var regEx = new RegExp(Object.keys(replaceMap).join("|"), "gi");

			var url = this.showMoreUrl.replace(regEx, function(matched){
				return replaceMap[matched];
			});

			this.$showMoreView.setUrl(url);
		},

		processShowMoreData: function (jsonData) {

			var items = jsonData.items.map(function(item) {

				var itemModel = new ArticleGridItemModel(item),
					itemView = ArticleGridItemViewFactory().create(itemModel.get('type'), {
						model: itemModel,
						rendered: false
					});

					return {
						model: itemModel,
						view: itemView
					};
			});

			var currentItemCount = this.setModels(this.model);
			this.itemModels.add(_.pluck(items, 'model'));
			this.itemViews = _.union(this.itemViews, _.pluck(items, 'view'));

			this.showMoreTags = jsonData.showMoreTags;
			this.showMoreUrl = jsonData.showMoreUrl;

			this.$articleGrid.append(items.map(function(item) { return item.view.el; }));

			var itemCount = this.setModels(this.model);

			this.initSubViews(_.pluck(items, 'view'), itemCount - currentItemCount).bind(this)();

			jitRequire.findDeps(this.$el);

			this.configureShowMore(this.model);

		    this.render(itemCount);

		    /* load comment count */
			var objCount = new commentCount({
			    container: this.$el
			});
		}
	});

	function ArticleGridItemViewFactory() {

		var TYPES = {
			'Tweet': ArticleGridTweetItemView,
			'Blog Archive': ArticleGridBlogItemView
		};

		function create (type, proto) {

			var View = TYPES[type];

			if (View) {
				return new View(proto);
			}

			return new ArticleGridItemView(proto);
		}

		return {
			create: create
		};
	}
});
