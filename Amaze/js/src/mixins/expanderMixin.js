define(['underscore', 'modules/animate'], function (_, animate) {

    'use strict';

    return {

        events: {
            'click [data-toggle]': 'toggle',
            'keydown [data-toggle]': 'keyToggle'
        },

        initExpander: function () {

            _.defaults(this.options, {
                expanderSelector: '[data-expander]',
                contentSelector: '[data-content]',
                toggleClass: 'expander--active',
                transitionDuration: 500
            });

            this.$toggle = this.$('[data-toggle]');
            this.$expander = this.$(this.options.expanderSelector);
            this.$content = this.$(this.options.contentSelector);

            this.toggleAttrs(true);

            this.$expander.css('overflow', 'hidden');
        },

        expand: function () {

            this.active = true;
            this.toggleAttrs(true);

            this.$expander.css('display', 'block');

            return this.animate(this.$content.outerHeight());
        },

        contract: function (instant) {

            this.active = false;
            this.toggleAttrs(false);

            if (instant) {

                this.$expander.css({
                	display: 'none',
                	height: 0,
                	opacity: 0
                });

                return $.Deferred().resolve(this);
            }

            return this.animate(0);
        },

        update: function (cb) {

        	this.lockHeight();

        	return animate(this.$expander, {
        		opacity: 0
        	}, {
        		duration: this.options.transitionDuration
        	}, this)
        		.then(cb)
        		.then(this.expand.bind(this));
        },

        animate: function (height) {

        	var props = {
            		height: height
        		},
        		opacity = Number(!!height);

        	if(+this.$expander.css('opacity') != opacity) {
        		props.opacity = opacity;
        	}

            return animate(this.$expander, props, {
            	duration: this.options.transitionDuration,
            	display: height ? 'block' : 'none'
            }, this).then(function (view) {
            	if (height) {
                    this.$expander.css('height', 'auto');
            	}
            	return view;
            }.bind(this));
        },

        toggleAttrs: function (visible) {

            this.$expander.toggleClass(this.options.toggleClass, visible);

            this.$toggle.attr('aria-expanded', visible);
            this.$expander.attr('aria-hidden', !visible);
        },

        keyToggle: function (evt) {

        	if (evt.keyCode == 13 || evt.keyCode == 32) {
        		evt.preventDefault();
        		this.toggle(evt);
        	}
        },

        lockHeight: function () {

        	this.$expander.css('height', this.$content.outerHeight());
        }
    };
});

