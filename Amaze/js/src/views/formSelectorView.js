define(['vendor/backbone', 'underscore', 'vendor/handlebars', 'mixins/expanderMixin', 'mixins/fragmentLoaderMixin', 'mixins/containerViewMixin', 'modules/eventDispatcher', 'modules/analytics', 'modules/animate', 'views/hexLoaderView', 'templates/form-error'], function (Backbone, _, Handlebars, expanderMixin, fragmentLoaderMixin, containerViewMixin, eventDispatcher, analytics, animate, HexLoaderView, formErrorTemplate) {

	'use strict';

	return Backbone.View.extend({

		constructor: function () {

			_.merge(this, expanderMixin, fragmentLoaderMixin, containerViewMixin);

			Backbone.View.apply(this, arguments);
		},

		events: {
			'change select[data-toggle]': 'toggle'
		},

		initialize: function (opts) {

			this.options = _.extend({
				formSelector: '[data-form]',
				transitionDuration: 500
			}, opts);

			this.eventDispatcher = eventDispatcher();
			this.transitionOptions = {
				duration: this.options.transitionDuration
			};

			this.hexLoaderView = new HexLoaderView();

			this.initExpander();
			this.contract(true);

			var $closeTemplate = this.$('#template-close-form');
			var $completeTemplate = this.$('#template-complete-form');
			var $errorTemplate = this.$('#template-error-form');

			this.openTemplate = this.$toggle.html();
			this.closeTemplate = ($closeTemplate && $closeTemplate.length) && Handlebars.compile($closeTemplate.html());
			this.completeTemplate = ($completeTemplate && $completeTemplate.length) && Handlebars.compile($completeTemplate.html());
			this.errorTemplate = ($errorTemplate && $errorTemplate.length) && Handlebars.compile($errorTemplate.html());

			this.addEvents();
			this.render();
		},

		addEvents: function () {

			this.listenTo(this.eventDispatcher, 'formError.Form', _.curry(this.complete)(this.errorTemplate).bind(this));
			this.listenTo(this.eventDispatcher, 'formComplete.Form', _.curry(this.complete)(this.completeTemplate).bind(this));
			this.listenTo(this.eventDispatcher, 'formRestart.Form', this.hide);
			this.listenTo(this.eventDispatcher, 'formUpdate.Form', this.lockHeight);
			this.listenTo(this.eventDispatcher, 'formUpdated.Form', this.expand);
			this.listenTo(this.eventDispatcher, 'formSubmit.Form', this.hold);
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;
				this.$('[data-submit]').remove();
			}

			return $.Deferred().resolve(this);
		},

		toggle: function (evt) {

			var $target = $(evt.currentTarget),
			    url = $target.attr('href') ? $target.attr('href') : $target.is('select') ? $target.children('option:selected').attr('data-href') : null,
				show = this.show.bind(this, url);

			if ($target.is('select')) {

				if(url && url.length) {

					analytics['form-selector']({
						'Label': $target.find('option:selected').text()
					});

					if(!this.active) {
						return show();
					}
					else {
						return this.hide().then(show);
					}
				}
				else {
					return this.hide();
				}
			}
			else {

				evt.preventDefault();

				if (!this.active) {
					return show();
				}

				return this.hide();
			}
		},

		show: function (url) {

			this.hexLoaderView.attach(this.$content);

			var fragment = this.loadFragment(url, formErrorTemplate, this.options.formSelector),
				deferred = this.closeTemplate ? $.when(fragment, this.expand(), this.fadeToggle(0)) : $.when(fragment, this.expand());

			return deferred.then(this.switchView.bind(this));
		},

		hide: function () {

			var deferred = this.closeTemplate ? $.when(this.fadeToggle(0), this.contract())
				.then(function () {
					if (this.closeTemplate) {
						this.$toggle.html(this.openTemplate);
					}
				}.bind(this))
				.then(this.fadeToggle(1)) : this.contract();

			return deferred.then(this.removeSubViews.bind(this)).then(function () {
				this.$content.empty();
				return this;
			}.bind(this));
		},

		complete: function (template, res) {

			this.hexLoaderView.detach();

			this.lockHeight();

			return $.when(animate(this.$el, 'scroll', {
				duration: this.options.transitionDuration
			}, this), this.fadeToggle(0)).then(function toggleComplete() {
				if(template) {
					this.$toggle.html(template(res));
				}
			}.bind(this)).then(this.fadeToggle.bind(this, 1));
		},

		hold: function () {

			this.hexLoaderView.attach(this.$content);
		},

		switchView: function ($content) {

			if (this.closeTemplate) {
				this.$toggle.html(this.closeTemplate());
			}

			return this.update(function loadView() {

				this.hexLoaderView.detach();

				return this.initSubViews(this.$content, $content, {
					eventDispatcher: this.eventDispatcher
				}).then(function expandContent() {
					return this.closeTemplate && this.fadeToggle(1);
				}.bind(this));
			}.bind(this));
		},

		fadeToggle: function (opacity) {

			return animate(this.$toggle, {
				opacity: opacity
			}, this.transitionOptions, this)
		},

		remove: function () {

			this.hexLoaderView.remove();
			this.removeSubViews();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
