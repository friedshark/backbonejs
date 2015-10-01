define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	var deferred = $.Deferred(),
		stateEvents = {
			'-1': 'unstarted',
			'0': 'ended',
			'1': 'playing',
			'2': 'paused',
			'3': 'buffering',
			'5': 'cued'
		};

	window.onYouTubeIframeAPIReady = function() {

		deferred.resolve({
			create: createPlayer
		});
	};

	function init() {

		var tag = document.createElement('script'),
			anchorTag = document.getElementsByTagName('script')[0];

			tag.src = "https://www.youtube.com/iframe_api";

			anchorTag.parentNode.insertBefore(tag, anchorTag);

	}

	function createPlayer (el, specs, eventDispatcher) {

		var deferred = $.Deferred(),
			options = _.merge(specs, {
				playerVars: {
					controls: Modernizr.touch ? 1 : 0,
					autoplay: 1,
					rel: 0,
					showinfo: 0,
					modestbranding: 1,
					wmode: 'opaque'
				},
				events: {
					onReady: function () {
						deferred.resolve(createApi(player, eventDispatcher));
					},
					onError: function () {
						deferred.reject();
					},
					onStateChange: function (evt) {

						if(eventDispatcher) {
							eventDispatcher.trigger('stateChange.Video', stateEvents[evt.data.toString()]);
						}
					}
				}
			});

		var player = new YT.Player(el, options);

		return deferred.promise();
	}

	function createApi (player, eventDispatcher) {

		return {
			base: player,
			destroy: player.destroy.bind(player),
			play: player.playVideo.bind(player),
			pause: player.pauseVideo.bind(player),
			seek: player.seekTo.bind(player),
			mute: function () {
				player.mute();
				eventDispatcher.trigger('stateChange.Video', 'mute');
			},
			unmute: function () {
				player.unMute();
				eventDispatcher.trigger('stateChange.Video', 'unMute');
			},
			setVolume: function (vol) {
				player.setVolume(vol);
				eventDispatcher.trigger('stateChange.Video', 'volume', player.getVolume());
			},
			getMuted: player.isMuted.bind(player),
			getVolume: player.getVolume.bind(player),
			getTime: player.getCurrentTime.bind(player),
			getProgress: function () {
				return player.getCurrentTime() / player.getDuration();
			},
			getDuration: player.getDuration.bind(player),
			getVideoUrl: player.getVideoUrl.bind(player)
		};
	}

	init();

	return deferred.promise();
});
