define(['vendor/backbone'], function (Backbone) {

    'use strict';

    var MEDIA_STATES = {
        PENDING: 'pending',
        ACTIVE: 'active',
        DENIED: 'denied'
    };

    return Backbone.Model.extend({

        MEDIA_STATES: MEDIA_STATES,

        defaults: {
            active: false,
            listening: MEDIA_STATES.PENDING,
            mode: 'living',
            overlay: null,
            watching: MEDIA_STATES.PENDING
        },

        reset: function () {

        	this.set(this.defaults);
        }
    });
});
