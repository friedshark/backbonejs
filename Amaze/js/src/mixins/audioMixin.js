define(['modules/eventDispatcher', 'underscore', 'modules/audio', 'views/mediaControlsView', 'templates/media-audio-controls'], function (eventDispatcher, _, audio, MediaControlsView, audioControlsTemplate) {

    'use strict';

    var $win = $(window);

    return {

        initAudio: function () {

            _.defaults(this.options, {});

            this.localDispatcher = eventDispatcher();
            this.addAudioEvents();
        },

        addAudioEvents: function () {

            this.listenTo(this.localDispatcher, 'stateChange.Audio', this.stateChange);
        },

        activate: function (api) {

            this.$audio = this.$('audio');

            return api.create(this.$audio.get(0), this.localDispatcher).then(this.ready.bind(this));
        },

        ready: function (player) {

            this.player = player;

            this.controlsView = new MediaControlsView({
                model: this.model,
                player: this.player,
                template: audioControlsTemplate
            });

            return this.controlsView.render().then(function appendControls(view) {
                this.$el.append(view.$el);
                return this;
            }.bind(this));
        },

        stateChange: function (evt) {

            if (evt == 'playing' || evt == 'pause') {
                this.model.set('playing', evt == 'playing');
            }
        },

        startAudio: function () {

            return audio.then(this.activate.bind(this));
        },

        removeAudio: function () {

            if (this.player) {
                this.player.destroy();
            }

            this.controlsView.remove();
        }
    };
});
