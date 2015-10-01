define(['jquery', 'underscore', 'views/angleCarouselView', 'views/angleCarouselControlsView', 'collections/angleCarouselCollection'], function ($, _, AngleCarouselView, AngleCarouselControlsView, AngleCarouselCollection) {

	'use strict';

	return function AngleCarouselController(opts) {

	    var options = _.extend({}, opts),
			$el = $(options.el),
			carouselSlides = $el.find('[data-view="angleCarouselSlide"]').toArray();

		if(carouselSlides.length < 2) {
			return;
		}

		var angleCarouselCollection = new AngleCarouselCollection(getCarouselData(carouselSlides)),
			angleCarouselView = new AngleCarouselView({
				collection: angleCarouselCollection,
				el: $el.find('[data-view="angleCarouselView"]')
			}),
			angleCarouselControlsView = new AngleCarouselControlsView({
				collection: angleCarouselCollection,
				el: $el.find('[data-view="angleCarouselControlsView"]')
			});

		angleCarouselView.render().then(function (carouselView) {

		    angleCarouselControlsView.render();
		    angleCarouselCollection.get(0).set('selected', true);

		}.bind(this));

		function getCarouselData(slides) {

			var $slide;

			return slides.map(function slideData(slide, i) {

				$slide = $(slide);
				return _.merge($slide.data(), {
					id: i,
					category: $slide.find('[data-text="category"]').text(),
					title: $slide.find('[data-text="title"]').text(),
					caption: $slide.find('[data-text="caption"]').text(),
					href: $slide.attr('href')
				});

			});
		}
	};
});
