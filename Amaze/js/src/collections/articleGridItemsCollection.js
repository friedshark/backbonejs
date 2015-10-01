define(['vendor/backbone', 'underscore', 'models/articleGridItemModel'], function (Backbone, _, ArticleGridItemModel) {

	'use strict';

	return Backbone.Collection.extend({

        model: ArticleGridItemModel,

        setFilters: function(filters) {

            this.models.forEach(function(model) {

                model.set('visible', Object.keys(filters).reduce(function(prev, filter) {

                	var modelVal = model.get(filter),
                		filterVal = filters[filter];

                	return !prev ? prev : filterVal == '' || (_.isArray(modelVal) ? _.contains(modelVal, filterVal) : String(modelVal) === String(filterVal));

                }, true));
            });

            return this.where({ visible: true }).length;
        }
	});
});
