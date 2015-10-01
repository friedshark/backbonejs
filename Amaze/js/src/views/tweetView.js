define(['vendor/backbone', 'underscore', 'modules/performance', 'modules/viewCycler', 'views/tweetItemView'], function (Backbone, _, performance, ViewCycler, TweetItemView) {

	'use strict';

    return Backbone.View.extend({

        initialize: function(opts) {

            this.options = _.extend({
                cycleInterval: (!!this.$el.data('cycle') && !isNaN(this.$el.data('cycle'))) ? parseInt(this.$el.data('cycle')) : 2000,
                cycleActiveClass: 'tweet--cycle',
                tweetItemSelector: '[data-tweet-item]',
                tweetItemActiveClass: 'tweet__item--active',
                tweetAnimationDuration: 1000
            }, opts);

			var tweetItemEls = this.$(this.options.tweetItemSelector).toArray();
			this.tweetItemViews = this.getTweetItems(tweetItemEls);

			this.render();
		},

		beginCycle: function () {

			this.$el.addClass(this.options.cycleActiveClass);

			if(!this.cycler) {
				this.cycler = new ViewCycler(this.tweetItemViews).start(0);
			}
			else {
				this.cycler.reset();
			}
		},

		haltCycle: function () {

			this.$el.removeClass(this.options.cycleActiveClass);

			if(this.cycler) {
				this.cycler.stop();
			}
		},

		render: function() {

			this.beginCycle();

			return $.Deferred().resolve(this);
		},

		remove: function() {

			this.haltCycle();

			Backbone.View.prototype.remove.apply(this, arguments);
		},

		getTweetItems: function (els) {

		    var cycleInterval = this.options.cycleInterval;
			return els.map(function (el, i) {

				return new TweetItemView({
					id: i,
					el: el,
					transitionDelay: cycleInterval
				});
			});
		}
	});
});
