define(['jquery', 'underscore'], function ($, _) {

	'use strict';

	function seek(time) {
	    
        this.currentTime = time;
	}

	function getTime() {
	    
	    return this.currentTime;
	}

	function getProgress() {
	    
	    return this.currentTime / this.duration;
	}

	function getDuration() {

	    return this.duration;
	}

	function createPlayer(player, eventDispatcher) {

	    (function addEvents() {
	        player.addEventListener('playing', stateChange, true);
	        player.addEventListener('pause', stateChange, true);
	    }());

	    function destroy() {
	        player.removeEventListener('playing', stateChange, true);
	        player.removeEventListener('pause', stateChange, true);
	    }

	    function stateChange(evt) {
	        eventDispatcher.trigger('stateChange.Audio', evt.type);
	    }

	    return $.Deferred().resolve({
	        base: player,
	        destroy: destroy,
	        play: player.play.bind(player),
	        pause: player.pause.bind(player),
	        seek: seek.bind(player),
	        mute: $.noop,
	        unmute: $.noop,
	        setVolume: $.noop,
	        getMuted: $.noop,
	        getVolume: $.noop,
	        getTime: getTime.bind(player),
	        getProgress: getProgress.bind(player),
	        getDuration: getDuration.bind(player)
	    });
	}

	return $.Deferred().resolve({
        create: createPlayer
    });
});
