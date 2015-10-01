define(['underscore', 'modules/globalDispatcher', 'modules/eventDispatcher', 'base'], function (_, globalDispatcher, eventDispatcher, base) {

	'use strict';

	return function ResponsiveImage(srcSet, opts) {

		var options = _.extend({}, opts),
			breakpoints,
			currentUrl,
			sources,
			self = this;

		_.extend(self, eventDispatcher());

		function init() {

			if(!srcSet) return;

			sources = getSources(srcSet);
			breakpoints = Object.keys(sources).map(function getMin(key) {
				return {
					min: +key
				}
			});

			base.breakpoints.setBreakpoints(breakpoints);

			addEvents();
			currentUrl = sources[base.breakpoints.matchCurrentBreakpoint(breakpoints).min.toString()];
		}

		function addEvents() {

			globalDispatcher.on('change.Breakpoints', dispatchUrl);
		}

		function dispatchUrl() {

			var url = sources[base.breakpoints.matchCurrentBreakpoint(breakpoints).min.toString()];

			if(url != currentUrl) {
				currentUrl = url;

				getImage(url).then(function (objectUrl) {
					self.trigger('change.ResponsiveImage', objectUrl);
				});
			}
		}

		function getSources(srcSet) {

			return srcSet.split(',').reduce(getSource, {});
		}

		function getSource(dict, src) {

			var pair = _.trim(src).split(' ');

			if(pair.length == 2) {
				dict[pair[1].replace(/[^0-9.]/g, '')] = pair[0];
			}
			else if (pair.length == 1) {
				dict['0'] = pair[0];
			}

			return dict;
		}

		var getImage = _.memoize(fetchImage);

		function fetchImage(url) {

		    var deferred = $.Deferred();

		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', url, true);
		    xhr.responseType = 'blob';

		    xhr.onload = function() {
		        if (this.status == 200) {
		            deferred.resolve(window.URL.createObjectURL(this.response));
		        }

		        deferred.reject();
		    };

		    xhr.onError = function() {
		        deferred.reject();
		    };

		    xhr.send();

		    return deferred.promise();
		}

		function destroy() {

			globalDispatcher.off('change.Breakpoints', dispatchUrl);
		}

		this.getCurrentImage = function () {

			return getImage(currentUrl);
		}

		init();
	}
});



