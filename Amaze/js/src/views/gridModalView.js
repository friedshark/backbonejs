define(['vendor/backbone', 'underscore', 'templates/expanding-grid-modal', 'views/gridContentView', 'views/hexLoaderView', 'vendor/velocity'], function (Backbone, _, gridModalTemplate, GridContentView, HexLoaderView) {

	'use strict';

	return Backbone.View.extend({

		className: 'expanding-grid__modal-container',

		events: {
			'click [data-control]': 'action'
		},

		initialize: function(opts) {

			this.options = _.extend({
				pageMax: 0,
				transitionDuration: 500
			}, opts);

			this.render();
		},

		render: function() {

			if(!this.rendered) {

				this.rendered = true;

				this.$el.html(gridModalTemplate());
				this.$outer = this.$el.find('[data-outer]');
				this.$inner = this.$el.find('[data-inner]');
				this.$marker = this.$el.find('[data-marker]');
				this.$prev = this.$el.find('[data-control="prev"]');
				this.$next = this.$el.find('[data-control="next"]');

				this.$outer.css({
					'height': 0
				});

				this.initSubViews();
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

			this.hexLoaderView = new HexLoaderView();

			this.contentView = new GridContentView({
				el: this.$el.find('[data-content]')[0]
			});
		},

        open: function(targetAnchor, targetId, url, markerPos) {

            var args = Array.prototype.slice.call(arguments, 0),
            	update = this.anchor ? this.anchor == targetAnchor : false;

            if (update || !this.active) {

				this.$marker.css({
	        		'left': (markerPos * 100) + '%'
	        	});

		    	this.setPagination(targetId);
            	this.show(targetAnchor, url, update);
            }
            else {

            	this.close().then(function reOpen() {
            		this.open.apply(this, args);
            	}.bind(this));
            }
        },

        shift: function (targetAnchor, markerPos) {

        	if(!this.active) return;

			this.$marker.css({
        		'left': (markerPos * 100) + '%'
        	});

        	this.anchor = targetAnchor;
        	this.anchor.$el.after(this.$el);
        },

       	show: function(targetAnchor, url, update) {

	        this.anchor = targetAnchor;
			this.active = true;

	        if (update) {
	            return this.updateContent(url).then(this.setContent.bind(this));
	        }
	        else {
	            this.options.eventDispatcher.trigger('open.GridModal');
	            return this.setContent(url);
	        }
	    },

	    update: function(view) {

	    	this.options.eventDispatcher.trigger('updated.GridModal');

	    	this.hexLoaderView.detach();
			view.show();

			this.expand();
	    },

        close: function(action) {

			if(!this.active) return $.Deferred().resolve();

			return this.contract(action);
        },

	    expand: function (lock) {

	    	var deferred = $.Deferred();

	    	this.$el.attr('aria-hidden', 'false');

			this.$outer.velocity('stop').velocity({
				height: this.$inner.outerHeight()
			}, this.options.transitionDuration, function () {

				if(!lock) {
					this.$outer.css({
						'height': 'auto'
					});
				}

				deferred.resolve(this);
			}.bind(this));

			return deferred.promise();
	    },

	    contract: function (action) {

			var deferred = $.Deferred();

			this.$el.attr('aria-hidden', 'true');

			this.contentView.hide(!!action);

			this.$outer.velocity('stop').velocity({
				'height': 0
			}, this.options.transitionDuration, function () {

				this.active = false;
		        this.anchor = null;

        		this.$el.detach();

        		if (action) {
        		    this.options.eventDispatcher.trigger('close.GridModal');
        		}

				deferred.resolve(this);
			}.bind(this));

        	return deferred.promise();
	    },

        action: function(evt) {

        	this[$(evt.currentTarget).data('control')].call(this, true);
        },

        prev: function() {

			this.options.eventDispatcher.trigger('shift.GridModal', -1);
        },

        next: function() {

			this.options.eventDispatcher.trigger('shift.GridModal', 1);
        },

		updateContent: function(url) {

			var deferred = $.Deferred();

			this.$outer.css({
				'height': this.$outer.outerHeight()
			});

			this.contentView.hide().then(function completeUpdateContent() {
				deferred.resolve(url);
			}.bind(this));

			return deferred.promise();
		},

	    setContent: function(url) {

	    	var deferred = $.Deferred();

			this.options.eventDispatcher.trigger('update.GridModal');

			this.hexLoaderView.attach(this.$inner);

			this.anchor.$el.after(this.$el);

			return this.expand(true).then(function (view) {
				return this.contentView.render(url);
			}.bind(this)).then(this.update.bind(this));
	    },

	    setPagination: function (id) {

	    	this.$prev.prop('disabled', !id);
	    	this.$next.prop('disabled', !(id < (this.options.pageMax - 1)));
	    },

	    removeSubViews: function () {

	    	this.hexLoaderView.remove();

	    	if(this.contentView) {
	    		this.contentView.remove();
	    	}
	    },

	    remove: function () {

	    	this.removeSubViews();

	    	Backbone.View.prototype.remove.apply(this, arguments);
	    }
	});
});
