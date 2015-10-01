define([
	'vendor/backbone',
	'underscore',
	'lib/timeline',
	'templates/_timeline',
	'templates/timeline-skew'
	],
	function (
		Backbone,
		_,
		Timeline,
		timelineTemplate,
		timelineSkewTemplate
	) {

		'use strict';

		return Backbone.View.extend({

			initialize: function (opts) {

				this.options = _.extend({}, opts);
			},

			render: function(){

				if(!this.rendered) {

					this.rendered = true;

					var $timeline = $(timelineSkewTemplate());

					this.$el.replaceWith($timeline);
					this.setElement($timeline[0]);

				    // NOTE - not sure if this path will need amending for release?
				    ///Static/data/timelineContent.json
				    return $.getJSON(this.options.url).then(function( data ){

						var timelineJSONData = [];

						data.contentItems.forEach(function getTimelineData(contentItem) {

							contentItem.events.forEach(function getEventData(eventItem) {

								timelineJSONData.push([
									eventItem.uid,
									eventItem.x,
									eventItem.y,
									eventItem.year,
									-1,
									-1,
									-1,
									eventItem.logo_url.length > 0 ? "/img/timeline/logos/" + eventItem.logo_url : "",
									eventItem.title,
									eventItem.text
								]);
							});
						});

						new Timeline(timelineJSONData);

					});
				}

				return $.Deferred().resolve(this);
			}
		});
});
