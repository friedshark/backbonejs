define(['modules/globalDispatcher', 'vendor/backbone', 'underscore', 'modules/eventDispatcher', 'collections/formFieldsetCollection', 'views/formView'], function (globalDispatcher, Backbone, _, eventDispatcher, FormFieldsetCollection, FormView) {

	'use strict';

	return function FormController(opts) {

		var options = _.extend({}, opts);

		var $el = $(options.el),
			localDispatcher = options.eventDispatcher || eventDispatcher(),
			formFieldsetCollection = new FormFieldsetCollection(getFieldsetModels($el)),
			formView = new FormView({
				el: $el[0],
				collection: formFieldsetCollection,
				eventDispatcher: localDispatcher
			});

		function getFieldsetModels($form) {

			return $form.find('fieldset').toArray().map(function getFieldsetModel(el, i) {

				var $el = $(el);

				return {
					id: i,
					step: padZeros(i + 1, 2),
					name: $el.find('legend').text()
				}
			})
		}

		function padZeros(n, l) {

			var str = '' + n;
			while(str.length < l) {
				str = '0' + str
			};

			return str;
		}

		return {
			remove: function () {
				formView.remove();
			}
		};
	};

});
