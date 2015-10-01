define(['vendor/backbone', 'underscore', 'base', 'modules/globalDispatcher',
    'modules/performance'], function (Backbone, _, base,
    globalDispatcher, performance) {

	'use strict';

    var $win = $(window);
    var $site = $('.site');

    return Backbone.View.extend({

        events: {
			'focus .navigation__item--snav': 'activatePrimaryNavItemEvent',
            'blur .navigation__item--snav': 'deactivePrimaryNavItemEvent',
            'mouseenter .navigation__item--snav': 'activatePrimaryNavItemEvent',
            'mouseleave .navigation__item--snav': 'deactivePrimaryNavItemEvent',
            'click .navigation__item--children': 'touchOpenPrimaryNavItem'
		},

		initialize: function (opts) {

		    this.options = _.extend(this.options || {
                navigationPrimaryNavItemSelector: '.navigation__item--pnav',
                navigationPrimaryNavItemActiveClass: 'navigation__item--active'
		    }, opts);

		    this.render();
		    this.addEvents();
		},

        reInitialize: function() {

            this.delegateEvents();
            this.render();
            this.addEvents();
        },

        render: function () {

            return $.Deferred().resolve(this);
        },

        addEvents: function () {

            this.listenTo(globalDispatcher, 'delegateClick.NavigationView', this.externalClick);
		},

        remove: function () {

            if (this.$currentOpeningEl) {
                this.deactivePrimaryNavItem(this.$currentOpeningEl);
                this.$currentOpeningEl = null;
            }

            this.undelegateEvents();
            this.stopListening();

            //Backbone.View.prototype.remove.apply(this, arguments);
        },

        touchClearPrimaryNavItem: function (clickedElement) {

            if ($.contains(this.el, clickedElement)) {
                return;
            }

            if (!this.options.touch) {
                return;
            }

            if (this.$currentOpeningEl)
                this.$currentOpeningEl = null;
        },

        touchOpenPrimaryNavItem: function (evt) {

            if (!this.options.touch) {
                return;
            }

            var elementToOpen = evt.currentTarget;

            if (this.$currentOpeningEl && this.$currentOpeningEl[0] === elementToOpen) {
                return;
            }

            evt.preventDefault();
            evt.stopPropagation();

            if (this.$currentOpeningEl) {
                this.deactivePrimaryNavItem(this.$currentOpeningEl);
            }

            this.activatePrimaryNavItemEvent(evt);
            this.$currentOpeningEl = $(elementToOpen);
        },

        activatePrimaryNavItemEvent: function (evt) {

            var $el = $(evt.currentTarget);
            this.activatePrimaryNavItem($el);
        },

        activatePrimaryNavItem: function ($el) {

            $el.closest(this.options.navigationPrimaryNavItemSelector)
                .addClass(this.options.navigationPrimaryNavItemActiveClass);
        },

        deactivePrimaryNavItemEvent: function (evt) {

            var $el = $(evt.currentTarget);
            this.deactivePrimaryNavItem($el);
        },

        deactivePrimaryNavItem: function ($el) {

            $el.closest(this.options.navigationPrimaryNavItemSelector)
                .removeClass(this.options.navigationPrimaryNavItemActiveClass);
        },

        externalClick: function(evt) {

            var clickedElement = evt.toElement;

            if ($.contains(this.el, clickedElement)) {
                return;
            }

            if (this.$currentOpeningEl) {
                evt.stopPropagation();
                evt.preventDefault();
                this.deactivePrimaryNavItem(this.$currentOpeningEl);
                this.$currentOpeningEl = null;
            }
        }

	});

});
