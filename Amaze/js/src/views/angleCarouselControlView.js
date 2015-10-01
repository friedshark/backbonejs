define(['vendor/backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click': 'select',
			'keypress': 'select'
		},

		initialize: function (opts) {

			this.options = _.extend({
				selectedClass: 'angle-carousel__control--selected'
			}, opts);

			this.render();
			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {

		    if(this.model.get('selected')) {
		        this.$el.addClass(this.options.selectedClass);
		        this.$el.attr('aria-selected', 'true');
		    }
		    else {
		        this.$el.removeClass(this.options.selectedClass);
		        this.$el.removeAttr('aria-selected');
		    }
		},

		select: function (evt) {

			if(evt.keyCode) {

				if(evt.keyCode == 32 || evt.keyCode == 13) {
					evt.preventDefault();
				}
				else {
					return;
				}
			}

			this.model.set('selected', true);
		}
	});
});
