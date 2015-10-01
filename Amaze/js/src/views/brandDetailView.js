define(['vendor/backbone', 'underscore', 'views/brandControlView', 'views/brandControlMediaView', 'templates/brand-controls'], function (Backbone, _, BrandControlView, BrandControlMediaView, brandControlsTemplate) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'click [data-overlay-trigger]': 'triggerOverlay'
		},

		initialize: function (opts) {

			this.options = _.extend({
				activeClass: 'brand__detail--active'
			}, opts);

			this.render();
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				var data = _.merge({ webGl: this.options.webGl }, this.model.toJSON()),
					content = this.options.template(data),
					$content = $(content);

				if(this.options.webGl) {

					this.$el.html(brandControlsTemplate(_.merge(data, {
						listening: Modernizr.getusermedia && $.trim($content.find('[data-listening]').html()),
						watching: Modernizr.getusermedia && $.trim($content.find('[data-watching]').html())
					})));

					this.initSubViews();

					this.$('[data-content="graphs"]').append(this.options.$graphs);
				}
				else {
					this.$el.html($content);
				}

				this.$el.toggleClass(this.options.activeClass, this.options.webGl);
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

			this.controlViews = this.getControlViews(this.$el);
		},

		triggerOverlay: function (evt) {

			this.model.set('overlay', $(evt.currentTarget).data('overlayTrigger'));
		},

		getControlViews: function ($el) {

			return $el.find('[data-control]').toArray().map(function (el) {

				var $el = $(el),
					label = $el.data('control');

				return ControlViewFactory().create(label, {
					model: this.model,
					id: label,
					el: el
				});

			}.bind(this));
		},

		removeSubViews: function () {

			if (this.controlViews) {

				this.controlViews.forEach(function (controlView) {
					controlView.remove();
				});
			}
		},

		remove: function () {

			this.removeSubViews();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});

	function ControlViewFactory() {

		var TYPES = {
			'living': BrandControlView,
			'listening': BrandControlMediaView,
			'watching': BrandControlMediaView
		}

		function create (type, proto) {

			var View = TYPES[type];

			if (View) {
				return new View(proto);
			}

			return new BrandControlView(proto);
		}

		return {
			create: create
		};
	}
});
