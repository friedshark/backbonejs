define(['underscore', 'modules/eventDispatcher', 'modules/analytics', 'modules/video', 'modules/fullscreen', 'views/videoControlsView', 'views/videoTouchControlsView', 'templates/media-video-controls', 'views/hexLoaderView'], function (_, eventDispatcher, analytics, video, fullscreen, VideoControlsView, VideoTouchControlsView, videoControlsTemplate, HexLoaderView) {

    'use strict';

    var $win = $(window);

    return {

        initVideo: function () {

            _.defaults(this.options, {
                innerSelector: '[data-video-inner]',
                contentSelector: '[data-video-content]',
                transitionDuration: 500,
				ratio: 0.5625
            });

            this.localDispatcher = eventDispatcher();
            this.$inner = this.$el.find(this.options.innerSelector);
            this.$content = this.$el.find(this.options.contentSelector);

            this.videoId = this.getYoutubeId(this.$('a').attr('href'));

            this.hexLoaderView = new HexLoaderView();

            this.addVideoEvents();
        },

        addVideoEvents: function () {

            this.listenTo(this.localDispatcher, 'stateChange.Video', this.stateChange);
            this.listenTo(this.model, 'change:fullscreen', this.toggleFullscreen);
        },

        activate: function (api) {

            this.$playerContainer = $('<div class="' + this.options.playerClass + '"/>');
            var $playerElem = $('<div class="' + this.options.frameClass + '"/>');

            this.$playerContainer.append($playerElem);
            this.$inner.after(this.$playerContainer);

            this.hexLoaderView.attach(this.$el);

            return api.create($playerElem.get(0), {
                height: '100%',
                width: '100%',
                videoId: this.videoId
            }, this.localDispatcher).then(this.ready.bind(this));
        },

        ready: function (player) {

            this.player = player;

            var VideoInterface = Modernizr.touch ? VideoTouchControlsView : VideoControlsView;

            this.controlsView = new VideoInterface({
                model: this.model,
                player: this.player,
                template: videoControlsTemplate,
                templateOptions: {
                    controls: true,
                    fullscreenEnabled: Modernizr.fullscreen
                }
            });

            this.hexLoaderView.detach();

            return this.controlsView.render().then(function appendControls(view) {
                this.$playerContainer.append(view.$el);
                return this;
            }.bind(this));
        },

        stateChange: function (evt, arg) {

            if (evt == 'playing' || evt == 'paused' || evt == 'ended') {
                this.analyticsEvent();
                this.model.set('playing', evt == 'playing');
            }

            switch (evt) {
            	case 'mute': this.model.set('muted', true);
            	break;
            	case 'unMute': this.model.set('muted', false);
            	break;
            	case 'volume': this.model.set('volume', arg);
            	default:;
            }
        },

        startVideo: function () {

            return video.then(this.activate.bind(this));
        },

        toggleFullscreen: function () {

	        fullscreen.toggleFullscreen(this.$playerContainer.get(0), function (state) {
                this.model.set('fullscreen', state);
            }.bind(this));
        },

        removeVideo: function () {

            if (this.player) {
                this.analyticsEvent();
                this.controlsView.remove();
                this.player.destroy();
            }

            this.hexLoaderView.remove();

            this.$playerContainer.remove();
        },

        analyticsEvent:function() {

            var currentTime = this.player.getTime(),
            	durationTime = this.player.getDuration(),
            	percent = Math.round(currentTime * 100 / durationTime);
            analytics['video-engagement']({
                'Action': this.player.getVideoUrl(),
                'Label': 'Play | ' + percent + '%'
            });
        },

        getYoutubeId: function (url) {

            var id = '';

            url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

            if (url[2] !== undefined) {
                id = url[2].split(/[^0-9a-z_\-]/i);
                id = id[0];
            }
            else {
                id = url;
            }

            return id;
        }
    };
});
