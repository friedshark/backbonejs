define(['vendor/backbone', 'underscore'], function (Backbone, _) {

    'use strict';

    return Backbone.View.extend({

        events: {
        	'keydown': 'handleSitewideKeydown',
        	'keyup': 'handleSitewideKeyup',
        	'keydown form': 'handleFormKeyesc'
        },

        initialize: function (opts) {

            this.options = _.extend({}, opts);

            this.modKey = 0;
        },

        handleSitewideKeydown: function (e) {

            var isInEditMode = $("input[id='PageInEditMode']").val();

            isInEditMode = isInEditMode && isInEditMode.toLowerCase() != 'false';

            if (!isInEditMode && e.which != 116) {

                if (e.which == 27) {
                    this.options.eventDispatcher.trigger('close.SearchOverlay');
                }
                else if (this.checkModKey(e)) {
                	this.modKey++;
            	}
            	else if (!this.modKey && this.checkAlphaNumeric(e)) {
                    this.options.eventDispatcher.trigger('open.SearchOverlay');
                }
            }
        },

        handleSitewideKeyup: function (e) {

        	var key = e.which;

			if (this.checkModKey(e)) {
				this.modKey--;
			}
        },

        render: function () {

        	return $.Deferred().resolve(this);
        },

        handleFormKeyesc: function (e) {

        	if (!(e.which == 27) && !this.checkModKey(e)) {

	        	e.stopPropagation();
			}
        },

        checkAlphaNumeric: function (e) {

			var key = e.which;

        	return (key >= 48 && key <= 90 || key >= 186 && key <= 222);
        },

        checkModKey: function (e) {

        	var key = e.which;

        	return (key == 17 || key == 18 || key == 91);
        }
    });
});
