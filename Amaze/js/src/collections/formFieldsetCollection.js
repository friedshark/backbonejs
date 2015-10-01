define(['vendor/backbone', 'models/formFieldsetModel'], function (Backbone, FormFieldsetModel) {

	'use strict';

	return Backbone.Collection.extend({

		model: FormFieldsetModel
	});
});
