define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	function findModules ($container, opts) {

		return $container.find('[data-require]').toArray().map(_.curry(initModule)(opts));
	}

	function initModule (opts, el) {

		var deferred = $.Deferred(),
			$el = $(el),
			regModule = $el.data('module'),
	        ref = $el.data('require');

        try {

        	if (regModule) {

        		deferred.resolve(regModule)
        	}
        	else {

		        require([ref], function(Module) {

		            var module = new Module(_.merge(opts || {}, {
		                el: el
		            }));

		            $el.data('module', module);
		            deferred.resolve(module);
		        });
        	}

        }
        catch(err) {
        	deferred.reject(err);
        }

        return deferred.promise();
	}

	function traceModules (deps) {

		$.when.apply(this, deps).done(function () {
			console.log('INFO: Modules loaded', Array.prototype.slice.call(arguments));
		});

		return deps;
	}

	return {
		findDeps: _.compose(traceModules, findModules)
	};
});



