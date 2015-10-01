define(['vendor/backbone', 'underscore', 'templates/select', 'modules/globalDispatcher'], function (Backbone, _, selectTemplate, globalDispatcher) {

	'use strict';

    $(document.body).on('click', function(evt) {
        globalDispatcher.trigger('hide.Select');
    });

    var KEY_DICT = {
        '38': 'keyUp',
        '40': 'keyDown',
        '13': 'keyChange'
    };

    return Backbone.View.extend({
        events: {
            'click [data-select]': 'show',
            'click [data-value]': 'select',
            'keydown [data-select]': 'keyShow',
            'keydown [data-value]': 'keySelect',
            'keydown': 'keyHandler',
            'change select': 'change'
        },

        initialize: function(opts) {

            this.options = _.extend({
                regionClass: 'frm-select__region',
                regionActiveModifier: '--active',
                defaultOptionLabel: 'Please Select...',
                defaultOptionValue: ''
            }, opts);

            this.$select = this.$el.find('select');

            this.$select.css({
            	position: 'absolute',
            	left: '-9999px'
            });

            this.$select.attr('tabindex', -1);

            this.$region = $('<div class="' + this.options.regionClass + '" />');
            this.$el.append(this.$region);

            this.refreshOptions();
            this.addEvents();
        },

        addEvents: function() {

            this.listenTo(globalDispatcher, 'show.Select', this.checkVisibility);
            this.listenTo(globalDispatcher, 'hide.Select', this.render);

            if(this.collection) {
            	this.listenTo(this.collection, 'add remove change', this.refreshOptions);
            }
        },

		render: function (evt, visible, index) {

			this.selectedIndex = index == undefined ? this.$select.find(':selected').get(0).index : index;

			this.$region.html(selectTemplate({
                id: 'select-' + this.$select.attr('id'),
			    selected: this.$select.find('option').get(this.selectedIndex),
				visible: visible,
				options: this.mapOptions(),
                classes: this.$select.attr('class')
			}));

		    this.toggleElement = this.$el.find('[data-select-toggle]')[0];

		    if(visible) {
		        this.$el.find('a')[this.selectedIndex].focus();
		    	this.$el.css('z-index', '10');

		    	globalDispatcher.trigger('show.Select', this);
		    }
		    else {
		    	this.$el.css('z-index', '0');
		    }

			return $.Deferred().resolve(this);
		},

		refreshOptions: function (collection) {

			if(this.collection) {
				this.$select.html(this.setOptions(this.collection.toJSON()));
			}

			this.render();
		},

		change: function () {

		    if(this.options.eventDispatcher) {
		    	this.options.eventDispatcher.trigger('change.Select', this.$select.val());
		    }

		    this.render();
		    this.toggleElement.focus();
		},

		checkKeySelect: function (evt, callback) {

		    if (evt.keyCode == 13 || evt.keyCode == 32) {
		        callback(evt);
		    }
		},

        checkVisibility: function(selectView) {

            if (selectView != this) {
                this.render();
            }
        },

        keyShow: function (evt) {

            this.checkKeySelect(evt, this.show.bind(this));
        },

        keySelect: function (evt) {

            this.checkKeySelect(evt, this.select.bind(this));
        },

		show: function (evt, index) {

			if(evt) {
				evt.preventDefault();
				evt.stopPropagation();
			}

			this.render(false, true, index);
		},

		select: function (evt) {

		    if (evt) {
		        evt.preventDefault();
		        evt.stopPropagation();
		    }

			var value = $(evt.currentTarget).data('value');

			this.$select.val(value);
			this.$select.trigger('change');
		},

		keyUp: function (evt) {

			this.keyDirection(evt, -1);
		},

		keyDown: function (evt) {

			this.keyDirection(evt, 1);
		},

		keyChange: function (evt) {

			this.$select.val(this.getSelectedOption().option.value);
			this.$select.trigger('change');
		},

		keyHandler: function (evt) {

			var handler = KEY_DICT[String(evt.keyCode)];

			if(handler) {
				this[handler].call(this, evt);
			}
		},

		keyDirection: function (evt, shift) {

			evt.preventDefault();

			var selectedOption = this.getSelectedOption(shift);
		    this.show(false, selectedOption.index);

			this.$el.find('a')[selectedOption.index].focus();
		},

		mapOptions: function () {

			return $.makeArray(this.$select.find('option')).map(function mapOption(option) {
				return option;
			});
		},

		setOptions: function (optionsData) {

			if(this.collection && optionsData.length) {
				this.$el.show();
			}
			else if (this.collection) {
				this.$el.hide();
			}

			var html = '<option value="' + this.options.defaultOptionValue + '">' + this.options.defaultOptionLabel + '</option>';

			optionsData.forEach(function setOptions(item) {
				html += '<option value="' + item.value + '" ' + (item.selected ? 'selected="selected"' : '') + '>' + item.text + '</option>';
			});

			return html;
		},

		getSelectedOption: function (shift) {

			shift = shift || 0;

			var options = this.$select.find('option'),
				index = this.selectedIndex + shift >= 0 && this.selectedIndex + shift < this.$select.find('option').length ? this.selectedIndex + shift : this.selectedIndex

			return {
				index: index,
				option: options[index]
			};
		},

		getValue: function () {

			return this.$select.val();
		},

		setValue: function (value) {

			this.$select.val(value);
			this.render();
		}
	});
});
