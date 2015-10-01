
define(['vendor/backbone', 'underscore', 'modules/animate'], function (Backbone, _, animate) {

	'use strict';

	var $win = $(window);

	return Backbone.View.extend({

		events: {
			'click': 'selectArticle'
		},

		initialize: function (opts) {

			this.options = _.extend({
				activeClass: 'expanding-grid__item--active',
				scrollDuration: 500
			}, opts);

			this.addEvents();
			this.addAria();
		},

		addAria: function () {

			this.$el.attr('aria-controls', 'expanding-grid-modal');
		},

		addEvents: function () {

			this.listenTo(this.options.eventDispatcher, 'change.GridExpander', this.render);
			this.listenTo(this.options.eventDispatcher, 'close.GridModal', this.render);
		},

		selectArticle: function (evt) {

			evt.preventDefault();

			this.options.eventDispatcher.trigger('select.GridArticle', this);
		},

		render: function (articleView) {

			if(articleView == this) {
				this.$el.addClass(this.options.activeClass);
				this.$el.attr('aria-expanded', 'true');

				animate(this.$el, 'scroll', {
					duration: this.options.scrollDuration
				});
			}
			else {
				this.$el.removeClass(this.options.activeClass);
				this.$el.attr('aria-expanded', 'false');
			}

			return $.Deferred().resolve(this);
		},

		getUrl: function () {

			return this.$el.attr('href');
		},
	});
});
