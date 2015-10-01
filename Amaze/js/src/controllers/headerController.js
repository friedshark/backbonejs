
define(['jquery', 'modules/eventDispatcher', 'underscore', 'models/avatarModel', 'views/menuView', 'views/navigationView', 'views/avatarView', 'collections/searchResultsCollection', 'collections/searchFiltersCollection', 'views/searchOverlayTriggerView', 'views/searchOverlayView', 'views/keyboardInputView'
    ], function ($, eventDispatcher, _, AvatarModel, MenuView, NavigationView, AvatarView, SearchResultsCollection, SearchFiltersCollection, SearchOverlayTriggerView, SearchOverlayView, KeyboardInputView) {

	'use strict';

	return function HeaderController(opts) {

		var options = _.extend({}, opts),
			$el = $(options.el),
	    	localDispatcher = eventDispatcher(),
	    	searchResultsCollection = new SearchResultsCollection(),
	    	searchFiltersCollection = new SearchFiltersCollection(),
            avatarView = new AvatarView({
                model: new AvatarModel(),
                el: $el.find('[data-view="avatarView"]')[0],
                canvasClass: 'header__avatar-canvas',
                avatarOptions: {
                	scale: 1.2
                },
                breakpoints: {
                    small: {
                        min: 0,
                        width: 150,
                        height: 150,
                        x: -0.25,
                        y: 0.25
                    },
                    large: {
                        min: 1024,
                        width: 300,
                        height: 300,
                        x: -0.25,
                        y: 0.5
                    }
                }
            }),
            menuView = new MenuView({
                eventDispatcher: localDispatcher,
                el: $el.find('[data-view="menuView"]')[0]
            }),
	        navigationView = new NavigationView({
				eventDispatcher: localDispatcher,
	            el: $el.find('[data-view="navigationView"]')[0]
	        }),
			searchTriggerView = new SearchOverlayTriggerView({
				eventDispatcher: localDispatcher,
				el: $el.find('[data-view="searchOverlayTriggerView"]')[0]
			}),
			keyboardView = new KeyboardInputView({
				eventDispatcher: localDispatcher,
				el: 'body'
			}),
			searchOverlayView = new SearchOverlayView({
				eventDispatcher: localDispatcher,
				results: searchResultsCollection,
				filters: searchFiltersCollection,
				tagName: 'section',
				className: 'search-results searchoverlay'
			});

	        avatarView.render();
	};
});
