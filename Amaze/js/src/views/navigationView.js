define(['vendor/backbone', 'underscore', 'base', 'modules/globalDispatcher',
    'views/navigationTrayView', 'views/navigationDesktopView'], function (Backbone, _, base,
    globalDispatcher,
    NavigationTrayView, NavigationDesktopView) {

	'use strict';

    $(document.body).on('click', function(evt) {
        if (evt.toElement) {
            globalDispatcher.trigger('delegateClick.NavigationView', evt);
        }
    });

    var $win = $(window);
    var $site = $('.site');

    return Backbone.View.extend({

		initialize: function (opts) {

		    this.options = _.extend(this.options || {}, opts);

		    this.initializeNavigationView(base.breakpoints.getActiveBreakpoint());

            this.render();
            this.addEvents();
		},

        render: function () {

            return $.Deferred().resolve(this);
        },

        addEvents: function () {

            this.initializer = this.initializeNavigationView.bind(this);
            this.listenTo(globalDispatcher, 'change.Breakpoints', this.initializer);
		},

        initializeNavigationView: function (currentBp, previousBp) {

            this.removeFocusOnActiveElement();

            if ((previousBp === undefined || previousBp.min >= 1024) && currentBp.min < 1024) {

                if (this.desktopView) {
                    this.desktopView.remove();
                }

                if (this.trayView) {
                    this.trayView.reInitialize();
                }
                else {
                    this.trayView = new NavigationTrayView({
                        el: this.el,
                        touch: Modernizr.touch,
                        eventDispatcher: this.options.eventDispatcher
                    });
                }
            }
            else if ((previousBp === undefined || previousBp.max < 1024) && currentBp.min >= 1024) {

                if (this.trayView) {
                    this.trayView.remove();
                }

                if (this.desktopView) {
                    this.desktopView.reInitialize();
                }
                else {
                    this.desktopView = new NavigationDesktopView({
                        el: this.el,
                        touch: Modernizr.touch,
                        eventDispatcher: this.options.eventDispatcher
                    });
                }
            }
        },

        removeFocusOnActiveElement: function() {

            var activeEl = document.activeElement;

            if (activeEl) {
                activeEl.blur();
            }
        }

	});
});
