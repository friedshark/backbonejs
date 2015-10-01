define(['views/brandControlView'], function (BrandControlView) {

    'use strict';

    return BrandControlView.extend({

        addEvents: function () {

            this.listenTo(this.model, 'change:' + this.id, this.stateChange);
            BrandControlView.prototype.addEvents.apply(this, arguments);
        },

        show: function () {

            this.active = true;

            if (this.model.get(this.id) == this.model.MEDIA_STATES.ACTIVE) {
                this.model.set('overlay', null);
                return this.expand();
            }
            else if (this.model.get(this.id) == this.model.MEDIA_STATES.DENIED) {
                this.model.set('overlay', this.id + 'Error');
                this.model.set('mode', null);

                return $.Deferred().reject();
            }

            return $.Deferred().resolve(this);
        },

        stateChange: function (model) {

            if (this.active) {
                this.show();
            }
        }

    });
});
