define(['underscore', 'modules/jitRequire'], function (_, jitRequire) {

	'use strict';

	return {

		initSubViews: function ($target, $content, opts) {

			this.removeSubViews();

			if($content) {
				$target.html($content);
			}

            return $.when.apply(this, jitRequire.findDeps($target, opts)).then(function () {
                this.subViews = Array.prototype.slice.call(arguments);
                return this;
            }.bind(this));
		},

		removeSubViews: function () {

			if (this.subViews) {

                this.subViews.forEach(function (view) {
                    view.remove();
                });

                this.subViews = null;
            }
		}
	};
});

