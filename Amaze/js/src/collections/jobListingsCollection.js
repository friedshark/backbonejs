define(['vendor/backbone', 'models/jobListingItemModel'], function (Backbone, JobListingItemModel) {

    'use strict';

    return Backbone.Collection.extend({

        model: JobListingItemModel,

        setFilters: function (location, category) {

            this.models.forEach(function (model) {

                model.set('visible',
                    (location === '' || model.get('location').toString() === location)
                    &&
                    (category === '' || model.get('category').toString() === category)
                );
            });

            return this.where({ visible: true }).length;
        }
    });
});
