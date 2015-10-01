define(['vendor/backbone', 'underscore', 'modules/performance', 'modules/scrollAnchor', 'templates/scroll-top', 'modules/animate'], function (Backbone, _, performance, scrollAnchor, scrollTopTemplate, animate) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click [data-scroll-top]': 'jump'
		},

		initialize: function (opts) {

			this.options = _.extend({
				activeOpacity: 0.5
			}, opts);

			this.addEvents();
			this.render();
		},

		addEvents: function () {

			this.scroller = performance.scroll(this.scroll.bind(this)).start();
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				this.$button = $(scrollTopTemplate());
				this.$el.append(this.$button);
			}

			return $.Deferred().resolve(this);
		},

		show: function () {

			if (!this.active) {
				this.active = true;
				animate(this.$button, {opacity : this.options.activeOpacity}, {display: "block"});
			}
			
		},

		hide: function () {

			if (this.active) {
				this.active = false;
				animate(this.$button, {opacity : 0}, {display: "none"});
			}
		},

		scroll: function (pos, delta) {

			var active = pos.y > 0 && delta.y < 0;

			this.$button.attr('aria-hidden', !active);
			this.$button.attr('tabindex', active ? 0 : -1);
			this.$button.prop('disabled', !active);

			var fn = active ? this.show : this.hide;
			fn.call(this);
		},

		jump: function () {

			scrollAnchor.trigger(this.$el.attr('id'));
		},

		remove: function () {

			this.scroller.stop();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
