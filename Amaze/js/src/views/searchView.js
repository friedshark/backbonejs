define(['vendor/backbone', 'modules/analytics'], function (Backbone, analytics) {

    'use strict';

    return Backbone.View.extend({

        events: {
            'keyup [data-search-text]': 'onSearch'
        },

        render: function () {

			return $.Deferred().resolve(this);
        },

        onSearch: function (e) {

            var query = $(e.target).val();
            var _this = this;

            if (query != undefined && query.length >= 2) {

                setTimeout(function () {

                    analytics['internal-site-search']({
                        'Action': query,
                        'Label': query
                    });

                    _this.$el.find("[data-search-form]").submit();

                }, 2000);
            }
        }
    });
});
