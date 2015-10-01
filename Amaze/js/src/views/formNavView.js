define(['vendor/backbone', 'underscore', 'templates/form-nav'], function (Backbone, _, formNavTemplate) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click [data-nav]': 'changeStep'
		},

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.activeId = this.options.activeId;

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.collection, 'change', this.render);
		},

		render: function () {

			var $template = $(formNavTemplate(this.collection.toJSON().map(function (item, i) {
				item.active = this.activeId === item.id;
				return item;
			}.bind(this))));

			this.$el.replaceWith($template);
			this.setElement($template[0]);

			return $.Deferred().resolve(this);
		},

		setActiveId: function (id) {

			this.activeId = id;

			return this.render();
		},

		changeStep: function (evt) {

			this.options.eventDispatcher.trigger('formStepChange.Form', +$(evt.currentTarget).data('nav'));
		}
	});
});
