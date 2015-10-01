define(['vendor/backbone', 'underscore'], function (Backbone, _) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'mousedown': 'startTrack',
			'touchstart': 'startTrack'
		},

		initialize: function (opts) {

		    this.options = _.extend({}, opts);

			this.$level = this.$el.find('[data-level]');

			this.render();
			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:volume', this.update);
		},

		render: function () {

			this.update();

			return $.Deferred().resolve(this);
		},

		update: function (model) {

			this.$level.css('height', this.model.get('volume') + '%');
		},

		startTrack: function () {

			if(this.tracker) return;

			this.tracker = this.track.call(this);
			this.$el.on('mousemove touchmove', this.tracker);
		},

		track: function () {

			var trackHeight = this.$el.outerHeight();

			return function (evt) {
				var level = 100 - Math.floor(((evt.offsetY || evt.originalEvent.layerY) / trackHeight) * 100);
				level = level >= 0 ? (level <= 100 ? level : 100) : 0;

				this.options.player.unmute();
				this.options.player.setVolume(level);
			}.bind(this);
		},

		stopTrack: function (evt) {

			this.$el.off('mousemove touchmove');
			this.tracker = null;
		},

		remove: function () {

			this.stopTrack();
			this.tracking = false;

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
