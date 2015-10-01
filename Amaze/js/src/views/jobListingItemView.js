define(['vendor/backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({}, opts);

			this.model.set({
				'category': this.$el.data('category'),
				'location': this.$el.data('location')
			});

			this.render();
			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:visible', this.render);
		},

		render: function () {

			this.$el.css('display', this.model.get('visible') ? 'block' : 'none');

			return $.Deferred().resolve(this);
		}
	});
});
