define(['views/mediaControlsView'], function (MediaControlsView) {

    'use strict';

    return MediaControlsView.extend({

        events: {
            'click [data-control]': 'action',
            'mouseup': 'endTrack',
            'click [data-fullscreen]': 'toggleFullscreen'
        },

        toggleFullscreen: function () {

            this.model.set('fullscreen', !this.model.get('fullscreen'));
        }
    });
});
