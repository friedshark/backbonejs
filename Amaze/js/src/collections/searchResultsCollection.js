define(['vendor/backbone', 'models/searchResultItemModel'], function (Backbone, SearchResultItemModel) {

	'use strict';

	return Backbone.Collection.extend({

        model: SearchResultItemModel
	});
});
