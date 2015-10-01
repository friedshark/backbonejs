define(['vendor/backbone', 'underscore', 'modules/animate', 'templates/form-continue'], function (Backbone, _, animate, formContinueTemplate) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'change input, select, textarea': 'validateField',
			'focus input, textarea': 'checkInactive',
			'blur input, textarea': 'checkInactive',
			'keyup input, textarea': 'checkInactive',
			'click [data-continue]': 'changeStep'
		},

		initialize: function (opts) {

			this.options = _.extend({
				transitionDuration: 500
			}, opts);

			if(this.model.get('id')) {
				this.hide(true);
			}

			this.$fields = this.$('input, select, textarea');

			if(!this.options.last) {
				this.$continue = $(formContinueTemplate());
				this.$el.append(this.$continue);
			}
			else {
				this.$submit = this.$('button[type="submit"]');
			}

			this.$('input, textarea').each(function (i, el) {
				this.toggleInactive($(el));
			}.bind(this));

			this.addEvents();
			this.render();
		},

		addEvents: function () {

			this.listenTo(this.model, 'change:valid', this.render);
		},

		render: function () {

			// if(this.$continue) {
			// 	this.$continue.prop('disabled', !this.model.get('valid'));
			// }
			// else if (this.$submit) {
			// 	this.$submit.prop('disabled', !this.model.get('valid'));
			// }

			this.$el.attr('id', this.model.get('name'));
			this.$el.attr('role', 'tab');

			return $.Deferred().resolve(this);
		},

		show: function () {

			this.toggleAria(true);

			return animate(this.$el, {
				opacity: 1
			}, {
				display: 'block',
				duration: this.options.transitionDuration
			}, this).then(function (view) {
				if(this.$fields.length) {
					this.$fields[0].focus();
				}
			}.bind(this));
		},

		hide: function (instant) {

			if(instant) {

				this.$el.css({
					display: 'none',
					opacity: 0
				});

				return this;
			}

			this.toggleAria(false);

			return animate(this.$el, {
				opacity: 0
			}, {
				display: 'none',
				duration: this.options.transitionDuration
			}, this);
		},

		changeStep: function (evt) {

			this.options.eventDispatcher.trigger('formStepChange.Form', this.model.get('id') + 1);
		},

		validateField: function (evt) {

			this.options.validator.element($(evt.target));

			this.validate();
		},

		validate: function (showErrors) {

			if(showErrors) {
				this.options.validator.form();
			}

			this.model.set('valid', !_.includes(this.$fields.toArray().map(function (el) {
			    if ($(el).css('display') == 'none')
			        return true;
				return this.options.validator.check(el);
			}.bind(this)), false));

			return this.model.get('valid');
		},

		disable: function () {

			this.$fields.prop('disabled', true);

			if(!this.options.last) {
				this.$continue.prop('disabled', true);
			}
			else {
				this.$submit.prop('disabled', true);
			}
		},

		toggleAria: function (visible) {

			this.$el.attr('aria-hidden', !visible);
		},

		toggleInactive: function ($target) {

			var $parent = this.getInputParent($target),
				state = this.getInputState($target);

			$parent.toggleClass(this.options.validatorOptions.inactiveClass, state);
		},

		checkInactive: function (evt) {
			this.toggleInactive($(evt.target));
		},

		getInputState: function ($el) {
			return !$el.val();
		},

		getInputParent: function ($el) {
			return $el.parent(this.options.validatorOptions.itemSelector);
		}
	});
});

