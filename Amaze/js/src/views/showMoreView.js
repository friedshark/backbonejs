define(['vendor/backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click': 'loadData'
		},

		initialize: function (opts) {

			this.options = _.extend({
				hiddenCssClass: 'show-more--hidden'
			}, opts);

			this.render();
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		loadData: function (evt) {

			evt.preventDefault();

			this.getData();
		},

		getData: function() {

			return $.ajax({
				url: this.options.url
				//data: this.options.data
			}).then(this.processResponse.bind(this), this.getError.bind(this));
		},

		getError: function() {
			this.trigger('errorDataLoaded.ShowMore');
		},

		processResponse: function(response) {
			this.trigger('dataLoaded.ShowMore', response);
		},

		setUrl: function(url) {
			this.options.url = url;
		},

		//setUrl: function(url, data) {
		//    this.options.url = url;
		//    this.options.data = data;
		//},

		hide: function () {
			this.$el.addClass(this.options.hiddenCssClass);
			this.rendered = false;
		},

		show: function () {
			this.$el.removeClass(this.options.hiddenCssClass);
			this.rendered = true;
		},

		visible: function () {
			return this.rendered;
		}
	});
});
