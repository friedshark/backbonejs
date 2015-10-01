define(['vendor/backbone', 'underscore', 'modules/performance'], function (Backbone, _, performance) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'mousedown': 'startTrack',
			'touchstart': 'startTrack'
		},

		initialize: function (opts) {

		    this.options = _.extend({}, opts);

			this.$seek = this.$el.find('[data-seek]');
			this.$progress = this.$el.find('[data-progress]');

			this.render();
			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:progress', this.update);
		},

		render: function () {

			this.update();

			return $.Deferred().resolve(this);
		},

		update: function (model) {

			this.$progress.css('width', (this.model.get('progress') * 100) + '%');
		},

		startTrack: function () {

			if(this.tracker) return;

			this.tracker = this.track.call(this);
			this.$el.on('mousemove touchmove', this.tracker);

			this.$seek.css('opacity', 0.5);
		},

		track: function () {

		    var trackWidth = this.$el.outerWidth();

			return function (evt) {

				var seek = (evt.offsetX || evt.originalEvent.layerX) / trackWidth;
				seek = seek >= 0 ? (seek <= trackWidth ? seek : trackWidth) : 0;

				this.$seek.css('width', (seek * 100) + '%');

				this.options.player.pause();
				this.options.player.seek(seek * this.options.player.getDuration());

			}.bind(this);
		},

		stopTrack: function (evt) {

			this.$el.off('mousemove touchmove');
			this.tracker = null;

			this.options.player.play();

			this.$seek.css('opacity', 0);
		},

		remove: function () {

			this.stopTrack();
			this.tracking = false;

			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});
});
