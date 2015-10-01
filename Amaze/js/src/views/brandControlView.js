define(['vendor/backbone', 'underscore', 'mixins/expanderMixin', 'templates/brand-controls'], function (Backbone, _, expanderMixin, brandControlsTemplate) {

	'use strict';

	return Backbone.View.extend({

		constructor: function () {

			_.merge(this, expanderMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function (opts) {

			this.options = _.extend({
				toggleClass: 'brand__expander--active'
			}, opts);

			this.initExpander();

			this.active = true;

			if (this.model.get('mode') != this.id) {
				this.contract(true);
			}

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:mode', this.render);
		},

		render: function (model) {

			if (model.changed.mode == this.id) {
				return this.show();
			}
			else if (this.active) {
				return this.hide();
			}

			return $.Deferred().resolve(this);
		},

		show: function () {

			return this.expand();
		},

		hide: function () {

			return this.contract();
		},

		toggle: function (evt) {

			evt.stopPropagation();

			if(this.model.get('mode') != this.id) {
				this.model.set('mode', this.id);
			}
			else {
				this.show();
			}
		}
	});
});
