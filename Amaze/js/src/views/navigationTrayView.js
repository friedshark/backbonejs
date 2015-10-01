define(['vendor/backbone', 'underscore', 'base', 'modules/globalDispatcher',
    'modules/performance', 'modules/animate'], function (Backbone, _, base,
    globalDispatcher, performance, animate) {

	'use strict';

    var $win = $(window);
    var $site = $('.site');

    return Backbone.View.extend({

        events: {
            'click [data-navigation-close]': 'closeNavigation',
            'click [data-navigation-children]': 'openSecondaryNavigation',
            'click [data-navigation-back]': 'back'
		},

		initialize: function (opts) {

		    this.options = _.extend(this.options || {
                navigationBodyClass: 'body--locked',
		        navigationOpenClass: 'navigation--open',
                navigationActiveLevelClass: 'navigation__level--active',
                navigationFixedClass: 'header--fixed',
                navigationHeightElementSelector: '[data-navigation-height]',
                animationDuration: 500,
                animationEasing: 'ease-in-out',
                skewAmountInRads: 5 * Math.PI / 180 // 5 = degs
		    }, opts);

		    this.navigationOpen = false;
		    this.closingNavigation = false;
		    this.offsetPosition = null;
		    this.$modeEl = this.$el.find('[data-navigation-mode]');

            // Elements to calculate heights on
		    this.$heightElements = this.$el.find(this.options.navigationHeightElementSelector);
		    this.$heightElements.push(this.$el);

		    this.setBreakpoint(base.breakpoints.getActiveBreakpoint());
            this.setDimensions();

		    this.render();
		    this.addEvents();
		},

        reInitialize: function() {

            this.setBreakpoint(base.breakpoints.getActiveBreakpoint());
            this.setDimensions();

            this.render();

            this.delegateEvents();
            this.addEvents();
        },

        render: function () {

            return $.Deferred().resolve(this);
        },

        addEvents: function () {

            this.resizer = performance.throttle(this.closeNavigation.bind(this), 250);
            $win.on('resize', this.resizer);
            this.closer = this.closeNavigation.bind(this);
            $win.on('orientationchange', this.closer);

            this.listenTo(this.options.eventDispatcher, 'menuActivated.MenuView', this.toggleNavigation);
            this.listenTo(globalDispatcher, 'delegateClick.NavigationView', this.externalClick);
            this.listenTo(this.options.eventDispatcher, 'headerState.HeaderView', this.storeHeaderState);
            this.listenTo(globalDispatcher, 'change.Breakpoints', this.setBreakpoint);
        },

        storeHeaderState: function(state) {

            this.headerState = state;
        },

        remove: function() {

            $win.off('resize', this.resizer);
            $win.off('orientationchange', this.closer);

            this.undelegateEvents();
            this.stopListening();

            this.setDimensions(true);

            //Backbone.View.prototype.remove.apply(this, arguments);
        },

        toggleNavigation: function(close, animationDuration) {

            var duration = animationDuration === undefined ? this.options.animationDuration : animationDuration;

            if (close) {

                this.$el.removeClass(this.options.navigationOpenClass);
                this.navigationOpen = false;

                if (duration === 0) {

                    this.$el.css({
                        display: 'none'
                    });

                    this.closingNavigation = false;

                    $(document.body).removeClass(this.options.navigationBodyClass);

                    this.offsetScrollSiteElement(true);

                } else {

                    animate(this.$el, {
                        translateZ: 0,
                        translateY: this.getNavYPosition.bind(this)(this.headerState, this.winScrollTop),
                        translateX: this.getNavX.bind(this)(this.breakpoint, true)
                    }, {
                        display: 'none',
                        duration: duration,
                        easing: this.options.animationEasing,
                        begin: function() {
                            this.closingNavigation = true;
                        }.bind(this)
                    }).then(function() {
                        this.closingNavigation = false;

                        $(document.body).removeClass(this.options.navigationBodyClass);

                        this.offsetScrollSiteElement(true);
                    }.bind(this));
                }

            } else {

                this.$el.addClass(this.options.navigationOpenClass);

                this.offsetScrollSiteElement();

                $(document.body).addClass(this.options.navigationBodyClass);

                setTimeout(function() {

                    this.setDimensions();
                    this.navigationOpen = true;

                    setTimeout(function() {

                        animate(this.$el, {
                            translateZ: 0,
                            translateY: this.getNavYPosition.bind(this)(this.headerState, this.winScrollTop),
                            translateX: this.getNavX.bind(this)(this.breakpoint)
                        }, {
                            display: 'block',
                            duration: duration,
                            easing: this.options.animationEasing
                        });

                    }.bind(this), 100);

                }.bind(this), 0);
            }
        },

        openSecondaryNavigation: function(evt) {

            evt.preventDefault();

            var $link = $(evt.currentTarget);

            this.$activeLevelEl = $link.next('[data-navigation-level]');

            this.toggleLevel(true);
        },

        back: function(evt) {

            evt.preventDefault();

            this.toggleLevel();
        },

        toggleLevel: function(state) {

            if (state) {
                this.$activeLevelEl.addClass(this.options.navigationActiveLevelClass);

                animate(this.$activeLevelEl, {
                    translateZ: 0,
                    translateX: ['0', '110%']
                }, {
                    display: 'block',
                    duration: this.options.animationDuration,
                    easing: this.options.animationEasing
                });
            }
            else {
                this.$activeLevelEl.removeClass(this.options.navigationActiveLevelClass);

                animate(this.$activeLevelEl, {
                    translateZ: 0,
                    translateX: ['110%', '0%']
                }, {
                    display: 'none',
                    duration: this.options.animationDuration,
                    easing: this.options.animationEasing,
                    begin: function() {
                        this.closingNavigation = true;
                    }.bind(this)
                }).then(function() {
                    this.closingNavigation = false;
                }.bind(this));
            }
        },

        closeNavigation: function(evt) {

            evt.preventDefault();
            evt.stopPropagation();

            if (this.closingNavigation || !this.navigationOpen) {
                return;
            }

            if (this.breakpoint.min >= 1024) {
                this.clearTransformsAndHeights();
                return;
            }

            if (!this.dimensions) {
                this.setDimensions();
                return;
            }

            var dimensions = this.getWindowDimensions();
            var winHeight = dimensions.windowHeight;
            var winWidth = dimensions.windowWidth;

            if (this.dimensions.windowHeight !== winHeight && this.dimensions.windowWidth === winWidth) {
                this.dimensions.windowHeight = winHeight
                return;
            }

            if ($.contains(this.el, evt.currentTarget)) {
                this.toggleNavigation(true);
            } else {
                this.toggleNavigation(true, 0);
            }
        },

        externalClick: function(evt) {

            var clickedElement = evt.toElement;

            if ($.contains(this.el, clickedElement)) {
                return;
            }

            if (this.navigationOpen) {
                evt.preventDefault();
                this.toggleNavigation(true);
            }
        },


        getNavX: function(breakpoint, invert) {

            if (invert) {

                if (breakpoint.name === 'medium') {
                    return [this.dimensions.windowWithSkew, (this.dimensions.windowWidth * 0.5)];
                }
                return [this.dimensions.windowWithSkew, (this.dimensions.windowWidth * 0.2)];
            }
            else {

                if (breakpoint.name === 'medium') {
                    return [(this.dimensions.windowWidth * 0.5), this.dimensions.windowWithSkew];
                }
                return [(this.dimensions.windowWidth * 0.2), this.dimensions.windowWithSkew];
            }
        },

        getNavYPosition: function(headerState, winScrollTop) {

            if (headerState && headerState.headerOffset !== null) {
                if (headerState.headerOffset <= 0) {
                    return [0, 0];
                }
                return [headerState.headerOffset, headerState.headerOffset];
            }
            else {
                return [winScrollTop, winScrollTop];
            }
        },

        offsetScrollSiteElement: function(reset) {

            if (reset) {

                $win[0].scrollTo(0, this.winScrollTop);
                $site.css('margin-top', 0);
                this.winScrollTop = 0;

                return;
            }

            this.winScrollTop = $win.scrollTop();

            var scrollTop = this.winScrollTop;

            $site.css('margin-top', -scrollTop);
        },

        getWindowDimensions: function() {

            return {
                windowWidth: window.innerWidth ? window.innerWidth: $win.width(),
                windowHeight: window.innerHeight ? window.innerHeight: $win.height()
            }
        },

        setHeights: function() {

            this.dimensions = this.getWindowDimensions();
            this.$heightElements.height(this.dimensions.windowHeight);
        },

        setSkewAdjustment: function() {

            var skewAdjustment = (Math.tan(this.options.skewAmountInRads) * this.dimensions.windowHeight);
            this.dimensions.windowWithSkew = this.dimensions.windowWidth + skewAdjustment;
        },

        setDimensions: function(remove) {

            if (remove) {

                this.$heightElements.height('auto');

                this.$el.attr('style', '');

                if (!this.$activeLevelEl)
                    return;

                this.$activeLevelEl.attr('style', '');
            }
            else {
                this.$el.css('display', 'none');
                this.setHeights();
                this.setSkewAdjustment();
            }
        },

        setBreakpoint: function(currentBp) {

            this.breakpoint = currentBp;
        }

    });
});
