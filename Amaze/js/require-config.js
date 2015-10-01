(function (root, factory) {
	'use strict';
	var requireJsShim = {
		cache: null,
		config: function (config) {
			if (config)
				this.cache = config;
			return this.cache;
		}
	};
	if (typeof define === 'function' && define.amd && typeof requirejs !== 'undefined') {
		factory(requirejs);
	} else if (typeof exports === 'object') {
		var config = factory(requireJsShim).config();
		module.exports = config;
	}
}(this, function (requirejs) {
	'use strict';
	requirejs.config({
		baseUrl: '/../js/',
		paths: {
			base: 'src/base',
			polyfills: 'src/polyfills',
			jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
			underscore: 'lib/lodash',
			controllers: 'src/controllers',
			mixins: 'src/mixins',
			models: 'src/models',
			modules: 'src/modules',
			vendor: 'lib/bower',
			views: 'src/views',
            templates: 'templates',
            collections: 'src/collections'
		},
		map: {
			'*': {
				'picturefill': 'vendor/picturefill',
				'handlebars': 'vendor/handlebars',
				'backbone': 'vendor/backbone',
				'hammerjs': 'vendor/hammer',
                'jquery-hammerjs': 'vendor/jquery.hammer'
			}
		},
		shim: {
		    'vendor/handlebars': {
		        exports: 'Handlebars'
		    },
		    'lib/owl.carousel': {
		        exports: 'jQuery.fn.owlCarousel',
		        deps: [
		            'jquery'
		        ]
		    }
		}/*,
        urlArgs: "bust=" +  (new Date()).getTime()*/
	});
	return requirejs;
}));
