define(['jquery', 'underscore', 'models/brandModel', 'views/brandView'], function ($, _, BrandModel, BrandView) {

    'use strict';

    return function BrandController(opts) {

        var options = _.extend({}, opts);

        var $el = $(options.el),
            brandModel = new BrandModel(),
            brandView = new BrandView({
                el: $el.find('[data-view="brandView"]')[0],
                model: brandModel
            });
    };

});
