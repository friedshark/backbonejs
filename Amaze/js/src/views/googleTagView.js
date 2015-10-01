define(['jquery', 'vendor/backbone', 'modules/analytics'], function ($, Backbone, analytics) {

	'use strict';

	return Backbone.View.extend({

		events: {
			"click a[href^='http://'],a[href^='https://'],a[href^='HTTP://'],a[href^='HTTPS://'],a[href^='mailto:']": "offsiteLink",
			"click a[href$='.pdf'],a[href$='.xls'],a[href$='.xlsx'],a[href$='.doc'],a[href$='.docx'],a[href$='.jpg'],a[href$='.jpeg'],a[href$='.jpe'],a[href$='.ico'],a[href$='.gif'],a[href$='.bmp'],a[href$='.png'],a[href$='.svg']": "downloadCollateral",
			"click [data-office]":"viewMap",
			"click [data-share]": "socialShare"
		},

		render: function () {

			return $.Deferred().resolve(this);
		},

		offsiteLink: function (evt) {

			var $target = $(evt.currentTarget),
				href = $target.attr("href"),
				text = $target.text().trim();

			// Don't track youtube videos or links on the same domain, that happen to start with http, or file downloads
			if (!/youtube.com/ig.test(href)
				&& href.indexOf(window.location.hostname) === -1
				 && !/^.*\.(jpg|jpeg|jpe|ico|gif|GIF|bmp|png|svg|doc|DOC|pdf|PDF)$/ig.test(href)
				&& !/google(\.[a-z]+)+\/maps/.test(href)) {

				analytics['offsite-links']({
					'Action': text,
					'Label': href
				});
			}
		},

		downloadCollateral: function (evt) {

			var $target = $(evt.currentTarget),
				href = $target.attr("href"),
				text = $target.text();

			analytics['download-collateral']({
				'Action': href,
				'Label': text
			});
		},

		socialShare: function (evt) {

			var $target = $(evt.currentTarget),
				network = $target.data("network"),
				shareLink = $target.data("share");

			analytics['socialInt']({
				'socialNetwork': network,
				'socialAction': 'Share',
				'socialTarget': shareLink
			});
		},

		viewMap:function(evt) {

			var $target = $(evt.currentTarget),
				office = $target.data("office");

			analytics['view-map']({
				'Label': office
			});
		}
	});
});
