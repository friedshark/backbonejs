define(['vendor/backbone', 'underscore', 'modules/analytics',
	'models/jobListingItemModel', 'views/jobListingItemView', 'collections/jobListingsCollection'],
	function (Backbone, _, analytics,
		JobListingItemModel, JobListingItemView, JobListingsCollection) {

	    'use strict';

	    return Backbone.View.extend({

	        initialize: function (opts) {

	            this.options = _.extend({}, opts);

	            var $el = $(this.options.el),
                    items = $.makeArray(this.$el.find('[data-view="jobListingItemView"]')).map(function (el) {

                        var itemModel = new JobListingItemModel({
                            category: $el.data('category'),
                            location: $el.data('location')
                        }),
                            itemView = new JobListingItemView({
                                el: el,
                                model: itemModel
                            });

                        return {
                            model: itemModel,
                            view: itemView
                        };
                    }.bind(this));

	            this.itemModels = new JobListingsCollection(_.pluck(items, 'model'));
	            this.itemViews = _.pluck(items, 'view');
	            this.$noVacanciesEl = $(this.options.tmplNoVacancies());

	            this.render();
	            this.addEvents();
	        },

	        addEvents: function () {

	            this.listenTo(this.model, 'change', this.render);
	        },

	        render: function () {

	            if (this.filterModels(this.model)) {
	                this.$noVacanciesEl.detach();
	            }
	            else {
	                this.$el.append(this.$noVacanciesEl);
	            }

	            return $.Deferred().resolve(this);
	        },

	        filterModels: function (model) {

	            analytics['careers-filter']({
	                'Label': (model.get('location') || '') + '|' + (model.get('category') || '')
	            });

	            return this.itemModels.setFilters(model.get('location'), model.get('category'));
	        }

	    });
	});
