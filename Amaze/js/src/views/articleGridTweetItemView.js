define(['vendor/backbone', 'underscore', 'views/articleGridItemView',
	'templates/_tweet-item-partial', 'templates/tweet-grid-item',
	'modules/animate'], function (Backbone, _, ArticleGridItemView, tweetItemPartial,
		tweetTemplate, animate) {

	'use strict';

	return ArticleGridItemView.extend({

		render: function () {

			if(!this.rendered) {

				this.replaceElement();
				this.rendered = true;
			}

			var module = this.$el.data('module');

			if (this.model.get('visible')) {

				this.$el.css({
					'opacity': 0,
					'display': 'flex'
				});

				animate(this.$el, { opacity: 1 }, { duration: this.options.animationDuration });

				if(module) {
					module.beginCycle();
				}
			}
			else {

				this.$el.css('display', 'none');

				if(module) {
					module.haltCycle();
				}
			}

			return $.Deferred().resolve(this);
		},

		getTemplate: function () {

			return $(tweetTemplate(this.model.toJSON()));
		}
	});
});
