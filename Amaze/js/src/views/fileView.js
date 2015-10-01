define(['vendor/backbone', 'underscore', 'templates/file'], function (Backbone, _, fileTemplate) {

	'use strict';

    return Backbone.View.extend({
        events: {
            'change input[type="file"]': 'render'
        },

        initialize: function(opts) {

            this.options = _.extend({
            	defaultLabel: 'Upload file...'
            }, opts);

            this.$file = this.$el.find('input[type="file"]');
            this.$file.css({
            	position: 'absolute',
            	left: '-9999px'
            });

            this.$file.attr('tabindex', -1);

            this.render();
        },

		render: function () {

			var fileVal = this.$file.val();

			var $content = $(fileTemplate({
				id: this.$file.attr('id'),
				classes: this.$file.attr('class'),
				value: fileVal ?  fileVal.substr(fileVal.lastIndexOf('\\') + 1) : this.options.defaultLabel,
				active: !!fileVal
			}));

			if(this.$label) {
				this.$label.replaceWith($content);
			}
			else {
				this.$el.append($content);
			}

			this.$label = $content;

			return $.Deferred().resolve(this);
		}
	});
});
