define(['vendor/backbone', 'underscore', 'views/mediaControlsSeekView', 'views/mediaControlsVolumeView', 'modules/performance'], function (Backbone, _, MediaControlsSeekView, MediaControlsVolumeView, performance) {

	'use strict';

	return Backbone.View.extend({

	    events: {
	        'click [data-control]': 'action',
	        'mouseup': 'endTrack'
	    },

		initialize: function (opts) {

			this.options = _.extend({
			    hiddenClass: 'media__control--hidden'
			}, opts);

			this.tracking = false;

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:playing', this.playState);
			this.listenTo(this.model, 'change:muted', this.mutedState);
			this.listenTo(this.model, 'change:duration', this.updateDuration);
			this.listenTo(this.model, 'change:time', this.updateTime);
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				var $template = $(this.options.template(_.extend(this.model.toJSON(), {
					time: this.formatTime(0),
					duration: this.formatTime(0)
				}, this.options.templateOptions)));

				this.$el.replaceWith($template);
				this.setElement($template[0]);

				this.$playControl = this.$el.find('[data-control="play"]');
				this.$pauseControl = this.$el.find('[data-control="pause"]');
				this.$muteControl =  this.$el.find('[data-control="mute"]');
				this.$unMuteControl = this.$el.find('[data-control="unmute"]');
				this.$time = this.$el.find('[data-time]');
				this.$duration = this.$el.find('[data-duration]');

				this.initSubViews();
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

		    var seekEl = this.$el.find('[data-view="MediaControlsSeek"]').get(0),
                volumeEl = this.$el.find('[data-view="MediaControlsVolume"]').get(0)

		    if(seekEl) {

		        this.seekView = new MediaControlsSeekView({
		            el: seekEl,
		            model: this.model,
		            player: this.options.player
		        });
		    }

		    if(volumeEl) {

		        this.volumeView = new MediaControlsVolumeView({
		            el: volumeEl,
		            model: this.model,
		            player: this.options.player
		        });
		    }
		},

		action: function (evt) {

			evt.preventDefault();

			var command = $(evt.currentTarget).data('control');
			this.options.player[command]();

			if(~command.indexOf('mute')) {
				this.model.set('muted', !~command.indexOf('unmute'));
			}
		},

		playState: function (model) {

			this.model.set('duration', Math.floor(this.options.player.getDuration()));
			this.model.set('volume', Math.floor(this.options.player.getVolume()));

			this.tracking = (this.toggleControl(model.changed.playing, this.$playControl, this.$pauseControl));

			if(this.tracking) {
				requestAnimationFrame(this.track.bind(this));
			}
		},

		mutedState: function (model) {

			this.toggleControl(model.changed.muted, this.$muteControl, this.$unMuteControl);
		},

		toggleControl: function (toggle, on, off) {

			if(toggle) {
				on.addClass(this.options.hiddenClass);
				off.removeClass(this.options.hiddenClass);
				off.focus();
			}
			else {
				on.removeClass(this.options.hiddenClass);
				off.addClass(this.options.hiddenClass);
				on.focus();
			}

			return toggle;
		},

		updateTime: function (model) {

			this.$time.text(this.formatTime(model.changed.time));
		},

		updateDuration: function (model) {

			this.$duration.text(this.formatTime(model.changed.duration));
		},

		track: function () {

			if(this.tracking) {

				this.model.set('time', Math.floor(this.options.player.getTime()));
				this.model.set('progress', this.options.player.getProgress());

				requestAnimationFrame(this.track.bind(this));
			}
		},

		endTrack: function () {

		    if (this.seekView) {
		        this.seekView.stopTrack();
		    }

		    if (this.volumeView) {
		        this.volumeView.stopTrack();
		    }
		},

		formatTime: function (seconds) {

			var mins = Math.floor(seconds / 60);
			var hours = Math.floor(seconds / 3600);
			var secs = seconds - (mins * 60);

			var time = mins + ':' + _.padLeft(secs, 2, '0');
			return hours ? hours + ':' + time : time;
		},

		removeSubViews: function () {

			if (this.seekView) {
		        this.seekView.remove();
		    }

		    if (this.volumeView) {
		        this.volumeView.remove();
		    }
		},

		remove: function () {

			this.removeSubViews();

			this.tracking = false;

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
