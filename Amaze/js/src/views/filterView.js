define(['vendor/backbone', 'underscore', 'modules/eventDispatcher', 'views/selectView'], function (Backbone, _, eventDispatcher, SelectView) {

	'use strict';

	var $win = $(window);

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.eventDispatcher = eventDispatcher();

			this.render();
			this.addEvents();
		},

		initSubViews: function () {

			this.filterViews = this.$el.find('[data-view="selectView"]').toArray().map(function (el, i) {
				return new SelectView({
					eventDispatcher: this.eventDispatcher,
					id: $(el).data('filter'),
					el: el
				});
			}.bind(this));
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				if (this.options.tmpl) {

					var $content = $(this.options.tmpl());

					this.$el.replaceWith($content);
					this.setElement($content[0]);
				}

				if(this.$el.data('baseurl')) {
					this.update = _.compose(this.updateHistory, this.updateModel, this.getFilterValues).bind(this);
				}
				else {
					this.update = _.compose(this.updateModel, this.getFilterValues).bind(this);
				}

				this.delegateEvents();

				this.initSubViews(this.$el);

				this.update();

				this.$el.find('[data-filter-auto-submit]').remove();
			}

			return $.Deferred().resolve(this);
		},

		addEvents: function () {

			if(this.$el.data('baseurl')) {

				this.popstateHandler = this.resetModel.bind(this)
				$win.on('popstate', this.popstateHandler);
			}

			this.listenTo(this.eventDispatcher, 'change.Select', this.update.bind(this));
			this.listenTo(this.model, 'change', this.updateFilters.bind(this));
		},

		resetModel: function (evt) {

			this.model.set(evt.originalEvent.state);
		},

		update: $.noop,

		updateFilters: function (model) {

			_.forIn(model.changed, function (value, key) {

				this.filterViews.filter(function (view) {
					return view.id == key;
				})[0].setValue(value);

			}.bind(this));
		},

		updateModel: function (filters) {

			this.model.set(filters);

			return filters;
		},

		updateHistory: function (filters) {

			var fn = history.state ? window.history.pushState : window.history.replaceState;

			fn.call(window.history, this.model.toJSON(), '', encodeURI([this.$el.data('baseurl')].concat(Object.keys(filters).reduce(function (arr, key) {
				var attr = String(filters[key]);
				return attr && attr != 'null' && attr.length ? arr.concat(attr) : arr;
			}, [])).join('/')));

			return filters;
		},

		getFilterValues: function () {

			return this.filterViews.reduce(function (obj, view) {
				obj[view.id] = view.getValue();
				return obj;
			}, {});
		},

		removeSubViews: function () {

			this.selectViews.forEach(function (view) {
				view.remove();
			});
		},

		remove: function () {

			$win.off('popstate', this.popstateHandler);
			this.removeSubViews();

			Backbone.View.remove.apply(this, arguments);
		}
	});
});
