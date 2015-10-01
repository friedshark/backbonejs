define(['vendor/backbone', 'underscore', 'modules/performance', 'modules/analytics', 'views/searchOverlayResultsView', 'views/selectView', 'templates/search-overlay'], function (Backbone, _, performance, analytics, SearchOverlayResultsView, SelectView, searchOverlayTemplate) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click': 'handleClick',
			'click [data-show-more]': 'loadMore',
			'click [data-close]': 'handleClose',
			'keyup [data-search]': 'handleKeyup',
			'change [data-filter]': 'handleFilterChange',
			'submit [data-form]': 'handleSubmit'
		},

		initialize: function (opts) {

			this.options = _.extend({
				visibilityModifierClass: 'searchoverlay--visible',
				htmlModifierClassWhenOverlayVisible: 'body--locked'
			}, opts);

			this.$el.append(searchOverlayTemplate());

			this.$form = this.$('[data-form]');

			this.initSubViews();

			this.addEvents();
			this.render();
		},

		addEvents: function () {

			this.listenTo(this.options.eventDispatcher, 'open.SearchOverlay', this.show);
			this.listenTo(this.options.eventDispatcher, 'close.SearchOverlay', this.hide);
		},

		render: function (value) {

			if(!this.rendered) {

				this.rendered = true;

				this.$el.appendTo('body');
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

			this.searchOverlayResultsView = new SearchOverlayResultsView({
				el: this.$el.find('[data-searchresults]')
			});

			this.selectView = new SelectView({
				el: this.$el.find('[data-view="views/selectView"]')[0],
				collection: this.options.filters,
				defaultOptionLabel: 'Filter results by...'
			});
		},

		search: function () {
			this.pageId = 1;
			this.$form.submit();
		},

		handleClick: function (e) {

			e.stopPropagation();
		},

		handleClose: function (e) {

			e.preventDefault();

			this.options.eventDispatcher.trigger('close.SearchOverlay');
		},

		handleKeyup: performance.debounce(function (e) {

			this.search();
		}, 1000),

		handleFilterChange: function (e) {

			this.search();
		},

		handleSubmit: function (e) {

			e.preventDefault();

		 	var term, filter;

		 	term 	= e.target.elements.search.value;
		 	filter 	= e.target.elements.filter.value;

	 		analytics['internal-site-search']({
	 	        'Action': term,
	 	        'Label': term
	 	    });

			this.performSearch(term, filter);
		},

		performSearch: function (term, filter) {

			if(this.request) {
				this.request.abort();
			}

			this.request = $.ajax({
				method: 'GET',
				url: this.$form.attr('action'),
				data: {
					term: encodeURIComponent(term),
					filter: encodeURIComponent(filter),
					pageId: this.pageId
				}
			});

			return this.request.then(this.processResults.bind(this), this.processError.bind(this));
		},

		processResults: function (response) {

			this.pageId = response.pageId;
		    var searchTerm = response.searchTerm;
			var op = this.pageId > 1 ? 'add' : 'reset';

			this.options.results[op](response.results);
			this.options.filters.set(response.filters);
            if (this.options.results.toJSON().length <= 0) {
                analytics['internal-site-search']({
                    'Action': searchTerm,
                    'Label': "No search terms found"
                });
            }
			this.searchOverlayResultsView.render(this.options.results.toJSON(), response.more);
		},

		processError: function (error) {

			this.options.results.reset([]);

			this.searchOverlayResultsView.render(this.options.results.toJSON());
		},

		loadMore: function () {

			this.pageId++;
			this.$form.submit();
		},

		lockPageScroll: function () {

			$('html').addClass(this.options.htmlModifierClassWhenOverlayVisible);
		},

		unlockPageScroll: function () {

			$('html').removeClass(this.options.htmlModifierClassWhenOverlayVisible);
		},

		show: function () {

			if (!this.isVisible) {

				this.lockPageScroll();
				this.$el.addClass(this.options.visibilityModifierClass);
				this.$el.find("[data-search]").focus();
				this.isVisible = true;
			}
		},

		hide: function () {

			if (this.isVisible) {

				this.unlockPageScroll();
				this.$el.removeClass(this.options.visibilityModifierClass);
				this.isVisible = false;
			}
		},

		removeSubViews: function () {

			this.searchOverlayResultsView.remove();
			this.selectView.remove();
		},

		remove: function () {

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
