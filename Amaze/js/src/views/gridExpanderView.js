define(['vendor/backbone', 'underscore', 'modules/globalDispatcher', 'modules/eventDispatcher', 'views/gridArticleView', 'views/gridModalView'], function (Backbone, _, globalDispatcher, eventDispatcher, GridArticleView, GridModalView) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options  = _.merge({}, opts);

			this.localDispatcher = eventDispatcher();

			this.$inner = this.$el.find('[data-grid-inner]');

			this.initSubViews();

			this.render();
			this.addEvents();
		},

		addEvents: function() {

			this.listenTo(globalDispatcher, 'change.Breakpoints', this.resize);

			this.listenTo(this.localDispatcher, 'shift.GridModal', this.selectArticleShift);
			this.listenTo(this.localDispatcher, 'updated.GridModal', this.triggerArticleChange);
			this.listenTo(this.localDispatcher, 'close.GridModal', this.setFocus);
			this.listenTo(this.localDispatcher, 'select.GridArticle', this.activateArticle);
		},

		render: function () {

			this.configureGrid();

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

			this.articleViews = this.$el.find('[data-view="gridArticle"]').toArray().map(function getArticleView(el, i) {
				return new GridArticleView({
					eventDispatcher: this.localDispatcher,
					id: i,
					el: el
				});
			}.bind(this));

            this.modalView = new GridModalView({
	        	eventDispatcher: this.localDispatcher,
	        	pageMax: this.articleViews.length
        	});
		},

		configureGrid: function() {

			var rowCount = this.getRowCount();

			if (this.currentRowCount != rowCount) {
				this.currentRowCount = rowCount;
			}
		},

		resize: function () {

			this.configureGrid();

			if(!this.modalView.active) return;

			this.modalView.shift(
				this.articleViews[this.getModalIndex(this.activeArticleIndex) - 1],
				this.getMarkerPos(this.activeArticleIndex));
		},

		setFocus: function () {

		    this.articleViews[this.activeArticleIndex].$el.focus();
		},

		triggerArticleChange: function () {

			this.localDispatcher.trigger('change.GridExpander', this.articleViews[this.activeArticleIndex]);
		},

		activateArticle: function(articleView) {

		    if (this.modalView.active && this.activeArticleIndex == articleView.id) {
		        return;
		    }

		    this.activeArticleIndex = articleView.id;

			this.modalView.open(
				this.articleViews[this.getModalIndex(this.activeArticleIndex) - 1],
				this.activeArticleIndex,
				articleView.getUrl(),
				this.getMarkerPos(this.activeArticleIndex));
		},

		deactivateArticle: function () {

			this.activeArticleView.render(false);
		},

		selectArticleShift: function(shift) {

			var i = this.activeArticleIndex + shift;

			if(i >= 0 && i < this.articleViews.length) {
				this.activateArticle(this.articleViews[i])
			}
		},

		getMarkerPos: function(i) {

	        return ((i % this.currentRowCount) / this.currentRowCount) + ((1 / this.currentRowCount) / 2);
		},

	    getModalIndex: function(targetIndex) {

	        var modalIndex = (((Math.floor(targetIndex / this.currentRowCount)) + 1) * this.currentRowCount);

	        if (modalIndex > this.articleViews.length) return modalIndex - (modalIndex - this.articleViews.length);
	        else return modalIndex;
	    },

		getRowCount: function() {

			return Math.round(this.$inner.width() / this.articleViews[0].$el.width());
		},

		removeSubViews: function () {

			this.modalView.remove();

		    this.articleViews.forEach(function (articleView) {
		        articleView.remove();
		    });
		},

		remove: function () {

		    this.removeSubViews();

		    Backbone.Views.prototype.remove.apply(this, arguments);
		}
	});
});
