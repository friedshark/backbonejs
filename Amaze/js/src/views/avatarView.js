define(['vendor/backbone', 'underscore', 'base', 'modules/eventDispatcher', 'modules/performance', 'lib/avatar', 'modules/breakpoints'], function (Backbone, _, base, eventDispatcher, performance, Avatar, Breakpoints) {

	'use strict';

	var $win = $(window);
	var $html = $('html');

	var AVATAR_MODES = {
		'living': 'normal',
		'watching': 'camera',
		'listening': 'audio'
	};

	return Backbone.View.extend({

		initialize: function (opts) {

			this.options = _.merge({
				canvasClass: 'avatar-canvas',
				avatarOptions: {
					seed: undefined,
					testDataURL: "",
					testMode: false,
					serverMode: false,
					resolution: undefined,
					cameraOverlayFlag: false,
					logoOverlayFlag: false,
					gradientTextureURL: "",
					highlightTextureURL: "/img/avatar/highlight.png",
					sheenTextureURL: "/img/avatar/sheen.png",
					logoTextureURL: "",
					dataTextureURL: "/img/avatar/dummy.png", // will eventually be something like "http://data-brand-dev.amaze.com/api/image-store?type=A"
					scale: 1,
					loopFlag: false,
					x: 0,
					y: 0,
					swing: 1,
					angle: 0,
					dataSpeed: 1,
					backgroundColor: undefined,
					transparentFlag: true,
					frames: undefined,
					//autoCalculateGeometry: false,
					//dataGraphs: null,
					//audioGraph: null,
					//graphWidth: 100,
					autoRender: true,
					inputErrorCallback: $.noop,
					inputSuccessCallback: $.noop,
					workerURL: '/js/workers/avatar-worker.js'
				},
				breakpoints: {}
			}, opts);
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:mode', this.setMode);
			this.listenTo(this.model, 'change:active', this.setState);
			this.setState(this.model);

			this.listenTo(this.eventDispatcher, 'change.Breakpoints', this.resize);
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				return this.createAvatar().then(this.appendAvatar.bind(this));
			}

			return $.Deferred().resolve(this);
		},

		appendAvatar: function (avatar) {

			this.avatar = avatar;
			this.$el.html(avatar.canvas);

			this.eventDispatcher = eventDispatcher();

			this.breakpoints = new Breakpoints(this.eventDispatcher, {
				breakpoints: Object.keys(this.options.breakpoints).map(function (key) {
					var breakpoint = this.options.breakpoints[key];
					breakpoint.name = key;

					return breakpoint;
				}.bind(this))
			});

			this.resize(this.breakpoints.getActiveBreakpoint());
			this.addEvents();

			return this;
		},

		toggleActivity: function (pos) {

			var canvasOffset = this.$canvas.offset(),
				condition = pos.y + $win.height() > canvasOffset.top && pos.y < canvasOffset.top + this.currentBreakpoint.height,
				fn = condition ? this.avatar.wake : this.avatar.sleep;

			fn.call(this.avatar);
		},

		resize: function (currentBreakpoint) {

			this.currentBreakpoint = currentBreakpoint;

			if (!this.avatar) {
				return;
			}

			this.avatar.resize(
				this.currentBreakpoint.width * window.devicePixelRatio,
				this.currentBreakpoint.height * window.devicePixelRatio,
				this.currentBreakpoint.x,
				this.currentBreakpoint.y
			);

			this.toggleActivity({
				x: window.pageXOffset,
				y: window.pageYOffset
			});
		},

		createAvatar: function () {

			var deferred = $.Deferred();

			this.$canvas = $('<canvas class="' + this.options.canvasClass + '" />');

			new Avatar(_.merge(this.options.avatarOptions, {
				canvas: this.$canvas[0],
				webglFailCallback: function (result) {
					deferred.reject();
				},
				webglSuccessCallback: function (avatar) {
					deferred.resolve(avatar);
				}.bind(this)
			}));

			return deferred.promise();
		},

		setMode: function (model) {

			this.avatar.setMode(AVATAR_MODES[model.get('mode')]);
		},

		setState: function (model) {

			(model.get('active') ? this.startAvatar : this.stopAvatar).call(this);
		},

		closeStreams: function () {

			this.avatar.closeMicrophoneAndCamera();
		},

		startAvatar: function () {

			if(!this.scroller) {
				this.scroller = performance.scroll(this.toggleActivity.bind(this));
			}

			this.scroller.start();
			this.avatar.wake();
		},

		stopAvatar: function (destroy) {

			if(this.scroller) {
				this.scroller.stop();
			}

			(destroy ? this.avatar.destroy : this.avatar.sleep).call(this.avatar);
		},

		remove: function () {

			if (this.breakpoints) {
				this.breakpoints.destroy();
			}

			this.stopAvatar();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
