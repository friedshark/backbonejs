define(['vendor/backbone', 'models/angleCarouselItemModel'], function (Backbone, AngleCarouselItemModel) {

	'use strict';

	return Backbone.Collection.extend({

		model: AngleCarouselItemModel,

		initialize: function (models) {

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this, 'change:selected', function (model) {

				if(model != this.active) {

					if(this.active) {
						this.active.set('selected', false);
					}

					this.active = model;
					this.trigger('change:active', this.active.get('id'));
				}
			});
		},

		getActiveId: function () {

			if(this.active) {
				return this.active.get('id');
			}
		}
	});
});
