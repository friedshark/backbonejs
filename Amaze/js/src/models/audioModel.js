define(['vendor/backbone'], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({

        defaults: {
            playing: false,
            time: 0,
            duration: 0,
            progress: 0,
            muted: false
        },

        reset: function () {

            this.clear().set(this.defaults);
        }
    });
});
