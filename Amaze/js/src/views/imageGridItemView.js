define(['vendor/backbone', 'underscore', 'modules/animate',
	'templates/image-grid-landscape-landscape-portrait', 'templates/image-grid-landscape-landscape', 'templates/image-grid-landscape', 'templates/image-grid-portrait-landscape-landscape',
	'templates/image-grid-portrait-portrait', 'templates/_image-grid-landscape-image-full', 'templates/_image-grid-landscape-image', 'templates/_image-grid-portrait-image', 'templates/_image-grid-portrait-large'],
	function (Backbone, _, animate, llpTemplate, llTemplate, lTemplate, pllTemplate, ppTemplate) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				animationDuration: 500
			}, opts);

			var $content = null;

			switch (this.model.layout)
			{
				case 'landscape-landscape-portrait':
					$content = $(llpTemplate(this.model));
					break;
				case 'landscape-landscape':
					$content = $(llTemplate(this.model));
					break;
				case 'landscape':
					$content = $(lTemplate(this.model));
					break;
				case 'portrait-landscape-landscape':
					$content = $(pllTemplate(this.model));
					break;
				case 'portrait-portrait':
					$content = $(ppTemplate(this.model));
					break;
			}

			if ($content === null || $content.length === 0) return;

			$content.css({
				display: 'none',
				opacity: 0
			});

			this.$el.replaceWith($content);
			this.setElement($content[0]);
		},

		render: function () {

			return animate(this.$el, {
				opacity: 1
			},
			{
				display: 'flex',
				duration: this.options.animationDuration
			});
		}
	});
});
