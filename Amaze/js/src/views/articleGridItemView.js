define(['vendor/backbone', 'underscore',
	'templates/article-summary-grid-item',
	'modules/animate'], function (Backbone, _,
		articleSummaryTemplate, animate) {

	'use strict';

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.extend({
				articleSummaryContentClass: 'article-summary__content',
				articleSummaryContentGridFullIndentedClass: 'article-summary__content--grid-full-indented',
				articleGridFlexHalfClass: 'article-grid__flex-half',
				articleGridFlexWholeClass: 'article-grid__flex-whole',
				animationDuration: 500
			}, opts);

			this.rendered = this.options.rendered;
			this.render();

			this.$content = this.$el.find('.' + this.options.articleSummaryContentClass);
		},

		replaceElement: function () {

			var $content = this.getTemplate();

			this.$el.replaceWith($content);
			this.setElement($content[0]);
		},

		render: function () {

			if(!this.rendered) {

				this.replaceElement();
				this.rendered = true;
			}

			if (this.model.get('visible')) {

				this.$el.css({
					'opacity': 0,
					'display': 'block'
				});

				animate(this.$el, { opacity: 1 }, { duration: this.options.animationDuration });
			}
			else {

				this.$el.css('display', 'none');
			}

			return $.Deferred().resolve(this);
		},

		desiredDisplay: function() {

			this.resetSize();
			this.changedSize = false;

			return this.model.get('display');
		},

		resetSize: function() {

			if (!this.changedSize)
				return;

			if (this.model.get('display') === 'half') {
				this.resizeToHalf();
			}
			else {
				this.resizeToFull();
			}
		},

		resizeToHalf: function() {

			this.changedSize = true;

			this.$el.addClass(this.options.articleGridFlexHalfClass).removeClass(this.options.articleGridFlexWholeClass);
			this.$content.removeClass(this.options.articleSummaryContentGridFullIndentedClass);
		},

		resizeToFull: function() {

			this.changedSize = true;

			this.$el.addClass(this.options.articleGridFlexWholeClass).removeClass(this.options.articleGridFlexHalfClass);
			this.$content.addClass(this.options.articleSummaryContentGridFullIndentedClass);
		},

		visible: function () {

			return (this.model.get('visible'));
		},

		getTemplate: function () {

			return $(articleSummaryTemplate(this.model.toJSON()));
		}
	});
});
