define(['modules/eventDispatcher', 'underscore', 'models/videoModel', 'views/videoView'], function (eventDispatcher, _, VideoModel, VideoView) {

	'use strict';

	return function VideoController(opts) {

		var options = _.merge({}, opts);

		var	videoModel = new VideoModel(),
			videoView = new VideoView({
				el: options.el,
				model: videoModel
			});
	};
});
