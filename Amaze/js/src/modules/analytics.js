define(['underscore'], function (_) {

	'use strict';

	var ANALYTICS_DICT = {
		'video-engagement': {
			'Category': 'Video Engagement'
		},
		'offsite-links': {
			'Category': 'Offset Links'
		},
		'view-map': {
			'Category': 'Contact Amaze',
			'Action': 'View Map'
		},
		'careers-filter': {
			'Category': 'Careers',
			'Action': 'Content Filter'
		},
		'download-collateral': {
			'Category': 'Download Collateral'
		},
		'internal-site-search': {
			'Category': 'Search The Amaze Site'
		},
		'form-selector': {
			'Category': 'Form Selector',
			'Action': 'Click'
		},
		'form-data': {
			'Category': 'Speculative Application Form'
		}
	}

	function push(defaults, evt) {

		var data = _.merge(defaults, evt);

		console.log('dataLayer:', data);

		if(dataLayer) {
			dataLayer.push(data);
		}
	}

	function virtualPageview(url, title) {

		push({}, {
			'event':'VirtualPageview',
			'virtualPageURL': url,
			'virtualPageTitle' : title
		});
	}

	return _.merge({
			virtualPageview: virtualPageview
		}, Object.keys(ANALYTICS_DICT).reduce(function append(obj, key) {
		obj[key] = _.partial(push, _.merge({
			'event': key
		}, ANALYTICS_DICT[key]));

		return obj;
	}, {}));
});
