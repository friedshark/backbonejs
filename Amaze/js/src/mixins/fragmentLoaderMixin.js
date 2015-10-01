define(['underscore'], function (_) {

	'use strict';

	return {

		loadFragment: function (url, errorTemplate, filter) {

			if(this.request) {
				this.request.abort();
			}

			this.request = $.ajax({
				url: url
			});

			return this.request.then(this.appendContent(filter).bind(this), this.appendError(errorTemplate).bind(this));
		},

		appendContent: function(filter) {

			return function (response) {

			    var content = $(document.createElement("html")).append(response),
			    	content = filter ? content.find(filter) : content,
			    	$content = $(content);

	            return $.Deferred().resolve($content);
			}
		},

		appendError: function(template) {

			return function (err) {

				return $(template({
					code: err.status,
					text: err.statusText
				}));
			}
		}
	};
});

