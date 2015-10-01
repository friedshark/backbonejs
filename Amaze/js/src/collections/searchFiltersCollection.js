define(['vendor/backbone', 'models/searchFilterItemModel'], function (Backbone, SearchFilterItemModel) {

	'use strict';

	return Backbone.Collection.extend({

        model: SearchFilterItemModel
	});
});
