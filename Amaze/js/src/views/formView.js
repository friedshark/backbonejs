define(['vendor/backbone', 'underscore', 'modules/analytics', 'modules/form', 'modules/validator', 'modules/eventDispatcher', 'modules/animate', 'views/formFieldsetView', 'views/formNavView', 'templates/form-complete'], function (Backbone, _, analytics, form, validator, eventDispatcher, animate, FormFieldsetView, FormNavView, formCompleteTemplate) {

	'use strict';

	return Backbone.View.extend({

		events: {
			'submit': 'submit',
			'click [data-restart]': 'restart'
		},

		initialize: function (opts) {

			this.options = _.extend({
				validatorOptions: {
	                errorClass: 'frm__item--invalid',
	                inactiveClass: 'frm__item--inactive',
	                itemSelector: '[data-form-item]',
    	            onfocusout: false,
	            	onkeyup: false
	            },
	            fade: 0.25,
	            transitionDuration: 500
			}, opts);

			this.id = this.$el.data('form');
			this.$el.attr('action', this.$el.data('action'));
			this.eventDispatcher = this.options.eventDispatcher || eventDispatcher();
			this.validator = this.$el.validate(_.merge({
				errorPlacement: function ($error, $element) {
	                $element.closest(this.itemSelector).append($error);
	            },
				highlight: function (element, errorClass) {
	                $(element).closest(this.settings.itemSelector).addClass(errorClass);
	            },
				unhighlight: function (element, errorClass) {
	            	$(element).closest(this.settings.itemSelector).removeClass(errorClass);
	            }
			}, this.options.validatorOptions));

			this.activeFieldsetId = 0;

			this.initSubViews();

			this.render();
			this.addEvents();

			this.pageView(this.activeFieldsetId);
		},

		addEvents: function () {

			this.listenTo(this.eventDispatcher, 'formStepChange.Form', this.setStep);
		},

		render: function () {

			if(!this.rendered) {

				this.rendered = true;

				if(this.navView) {
					this.navView.render().then(this.appendView.bind(this));
				}
			}

			return $.Deferred().resolve(this);
		},

		initSubViews: function () {

			this.fieldsetViews = this.getFieldsetViews(_.zip(this.$el.find('fieldset').toArray(), this.collection.models));

			if(this.fieldsetViews.length > 1) {
				this.navView = new FormNavView({
					eventDispatcher: this.eventDispatcher,
					collection: this.collection,
					activeId: this.activeFieldsetId
				});
			}
		},

		setStep: function (id) {

			var currentStep = this.fieldsetViews[this.activeFieldsetId],
				newStep = this.fieldsetViews[id];

			if (!this.changing && currentStep.validate(true)) {

				this.changing = true;

				this.pageView(id);
				this.eventDispatcher.trigger('formUpdate.Form');

				return (currentStep ? currentStep.hide().then(newStep.show.bind(newStep)) : newStep.show()).then(this.setActiveFieldsetId.bind(this, id));
			}

			return $.Deferred().reject();
		},

		appendView: function (view) {

			this.fieldsetViews[0].$el.before(view.$el);
		},

		submit: function (evt) {

			evt.preventDefault();

			if(!_.include(this.collection.models.map(function(model) {
				return model.get('valid');
			}), false)) {

				this.pageView(null, true);
				this.eventDispatcher.trigger('formSubmit.Form');

				animate(this.$el, {
					opacity: this.options.fade
				}, {
					duration: this.options.transitionDuration
				}).then(function () {

					this.sendForm();

					this.fieldsetViews.forEach(function (view) {
						view.disable();
					});

				}.bind(this));
			}
		},

		sendForm: function () {

			return form.send(this.$el).then(function (res) {
				this.eventDispatcher.trigger('formComplete.Form', res);
				return this.complete(res);
			}.bind(this), function (err) {
				this.eventDispatcher.trigger('formError.Form', err);
				return this.complete(err);
			}.bind(this));
		},

		complete: function (res) {

			return this.fieldsetViews[this.activeFieldsetId].hide().then(function renderComplete() {

			    var $fragment = $(formCompleteTemplate(res).replace(/\\n/g, "<br/>"));

				$fragment.css('opacity', 0);

				this.$el.html($fragment);
				this.removeSubViews();

				this.$el.css('opacity', 1);

				this.eventDispatcher.trigger('formUpdated.Form');

				return animate($fragment, {
					opacity: 1,
				}, {
					duration: this.options.transitionDuration
				}, this);
			}.bind(this));
		},

		restart: function (evt) {

			this.eventDispatcher.trigger('formRestart.Form');
		},

		pageView: function (id, conf) {

			var currentStep = this.fieldsetViews[id],
				title = this.$el.data('form-name'),
				url = '/virtual/' + _.kebabCase(title).toLowerCase() + '/';

			if(conf) {
				url += 'confirmation';
			}
			else {
			    var name = currentStep.model.get('name');
			    if (name != undefined && name != "") {
			        url += _.kebabCase(name).toLowerCase() + '/step-' + (id + 1);
			    } else {
			        url += 'step-' + (id + 1);
			    }

			}

			analytics['virtualPageview'](url, title);
		},

		setActiveFieldsetId: function (id) {

			this.eventDispatcher.trigger('formUpdated.Form');

			this.activeFieldsetId = id;
			this.changing = false;

			if(this.navView) {
				this.navView.setActiveId(this.activeFieldsetId);
			}
		},

		getFieldsetViews: function (pairs) {

			return pairs.map(function (pair, i) {

				return new FormFieldsetView({
					el: pair[0],
					model: pair[1],
					last: i === pairs.length - 1,
					validator: this.validator,
					eventDispatcher: this.eventDispatcher,
					validatorOptions: this.options.validatorOptions
				});

			}.bind(this));
		},

		removeSubViews: function () {

			this.fieldsetViews.forEach(function (view) {
				view.remove();
			});

			if(this.navView) {
				this.navView.remove();
			}
		},

		remove: function () {

			this.removeSubViews();

			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});
