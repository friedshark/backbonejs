define(['vendor/backbone', 'underscore', 'vendor/handlebars', 'modules/globalDispatcher', 'modules/animate', 'mixins/expanderMixin', 'views/avatarView', 'views/brandDetailView', 'views/brandOverlayView', 'views/brandAudioView', 'templates/brand-graphs'], function (Backbone, _, Handlebars, globalDispatcher, animate, expanderMixin, AvatarView, BrandDetailView, BrandOverlayView, BrandAudioView, brandGraphsTemplate) {

	'use strict';

	var DEVICE_DICT = {
		camera: 'watching',
		microphone: 'listening'
	};

	return Backbone.View.extend({

		constructor: function () {

			_.extend(this, expanderMixin);

			Backbone.View.apply(this, arguments);
		},

		initialize: function (opts) {

			this.options = _.extend({
				avatarRatio: 9/16,
				graphSelector: '[data-brand-graph]',
				toggleExpandLabel: 'Expand',
				toggleCollapseLabel: 'Collapse',
				toggleExpandClass: 'brand__toggle brand__toggle--expand',
				toggleCollapseClass: 'brand__toggle brand__toggle--collapse',
				transitionDuration: 500
			}, opts);

			this.initExpander();
			this.hide(true);

			this.$toggleExpand = this.$('[data-toggle="expand"]');

			this.subViews = [this.initAvatarView()];

			this.addEvents();
		},

		addEvents: function () {

			this.listenTo(globalDispatcher, 'scrolled.ScrollAnchor', this.scrollAnchor);
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				return this.avatarView.render()
					.then(this.createGraphs.bind(this))
					.then(_.partial(this.initSubViews, true).bind(this))
					.then(this.renderSubViews.bind(this))
					.fail(_.partial(this.initSubViews, false).bind(this));
			}

			return $.Deferred().resolve(this);
		},

		initAvatarView: function () {

			this.avatarView = new AvatarView({
				el: this.$('[data-view="avatarView"]')[0],
				model: this.model,
				canvasClass: 'brand__avatar-canvas',
				avatarOptions: {
					scale: 1.2,
					inputSuccessCallback: this.setDeviceState(this.model.MEDIA_STATES.ACTIVE).bind(this),
					inputErrorCallback: this.setDeviceState(this.model.MEDIA_STATES.DENIED).bind(this)
				},
				breakpoints: {
					base: {
						min: 0,
						width: 320,
						height: 320
					},
					small: {
						min: 480,
						width: 480,
						height: 480
					},
					medium: {
						min: 800,
						width: 800,
						height: this.getAvatarHeight(800)
					},
					large: {
						min: 1024,
						width: 1024,
						height: this.getAvatarHeight(1024)
					},
					xlarge: {
						min: 1200,
						width: 1200,
						height: this.getAvatarHeight(1200)
					}
				}
			});

			return this.avatarView;
		},

		initSubViews: function (webGl, $graphs) {

			this.detailView = new BrandDetailView({
				el: this.$('[data-view="brandDetailView"]')[0],
				model: this.model,
				template: Handlebars.compile(this.$('#template-brand-detail').html()),
				webGl: webGl,
				$graphs: $graphs
			});

			this.subViews.push(this.detailView);

			if(webGl) {

				this.audioView = new BrandAudioView({
					model: this.model,
					audioUrl: this.$el.data('audioTrack')
				});

				this.overlayView = new BrandOverlayView({
					model: this.model,
					template: Handlebars.compile(this.$('#template-brand-overlay').html())
				});

				this.subViews.push(this.audioView, this.overlayView);
			}
		},

		renderSubViews: function () {

			var audioAnchor = $('[data-audio-anchor]'),
				overlayAnchor = $('[data-overlay-anchor]');

			return $.when(
				this.audioView.render().then(_.partial(this.appendView, audioAnchor).bind(this)),
				this.overlayView.render().then(_.partial(this.appendView, overlayAnchor).bind(this))
			);
		},

		createGraphs: function (view) {

			var avatar = view.avatar,
				streams = avatar.description.streams.filter(function (stream) {
					return stream.uid > 0;
				}),
				$graphs = $(brandGraphsTemplate({
				streams: streams
			}));

			_.zip($graphs.find(this.options.graphSelector).toArray(), streams.map(function (stream) {
				return stream.uid;
			})).forEach(function (pair) {

				avatar.registerGraph({
					uid: pair[1],
					element: pair[0]
				})
			});

			return $graphs;
		},

		appendView: function ($anchor, view) {

			$anchor.prepend(view.$el);
		},

		scrollAnchor: function (target) {

			if(target != 'brand') {
				return;
			}

			this.show();
		},

		toggle: function () {

			if (!this.model.get('active')) {
				return this.show();
			}

			return this.hide().then(this.reset.bind(this));
		},

		show: function () {

			this.model.set('active', true);

			return this.render().always(function () {

				animate(this.$el, 'scroll', {
					duration: this.options.transitionDuration
				});

				animate(this.$toggleExpand, {
					opacity: 0
				}, {
					display: 'none'
				});

				return this.expand();
			}.bind(this));
		},

		hide: function (instant) {

			this.model.set('active', false);

			animate(this.$toggleExpand, {
				opacity: 1
			}, {
				display: 'inline-block',
				duration: this.options.transitionDuration
			});

			return this.contract(instant);
		},

		reset: function (view) {

			this.model.reset();
			this.avatarView.closeStreams();

			return view;
		},

		getAvatarHeight: function (height) {

			return (height * this.options.avatarRatio);
		},

		setDeviceState: function (state) {

			return function (avatar, response) {

				this.model.set(DEVICE_DICT[response.avatarDevice], state);
			};
		},

		removeSubViews: function () {

			this.subViews.forEach(function(view) {
				view.remove();
			});
		},

		remove: function () {

			this.removeSubViews();

			Backbone.View.prototype.remove.apply(this, arguments);
		}

	});
});
