// Timeline code
//
// 18 / 6 / 2015 Daniel Brown
//
//  WARNING: SEARCH WARNING TO FIND NON-DEPLOYMENT CODE
define([
		'lib/tweenlite', 
		'lib/cssplugin', 
		'vendor/hammer',
		'modules/globalDispatcher',
		'base',
		'underscore',
		'modules/performance'
	], 
	function ( 
		TweenLite,
		CSSPlugin, 
		Hammer, 
		globalDispatcher,
		base,
		_,
		performance
	){

	return function Timeline( timelineJSONData ) {

		var numItemsWide = 0;
		var scrollBarRatio = 1;
		var items = [];
		var activeOpenItem = undefined;
		var $container, $hexagonOverlay, $hexagonShadowSmall;
		var containerWidth, containerHeight;
		var hexWidth = 100, hexSin, hexRadius, hexWidth, hexHeight, hexM, hexOffset, hexScaler;
		var largeHexWidth, largeHexHeight, largeHexScaler;
		var grid = [];
		var gridWidth, gridHeight;
		var gridXOffset;
		var initialisedFlag = false;
		var viewportFlag = false; // initialise when in view
		var isFullDesktopView = true;
		var touchAngle=0;
		var m_Breakpoint = {
			current: base.breakpoints.getActiveBreakpoint(),
			prev: base.breakpoints.getActiveBreakpoint()
		};
		var $firstHex, // assumes at least one hexagon
			$scrollingContent,
			$timelineContainer,
			$scrollBar,
			$scrollControls,
			$scrollBarWrapper,
			$scrollBtnLeft,
			$scrollBtnRight,
			$wndw = $(window),
			$scrollContainer;
		var updateScrollBar = false;
		var prevMouseX = 0;
		var btnScrollStep = 64;
		var m_SwipedToNext = false;
		var m_MaxSwipeAngle = 85; // NOTE - should be <= 90
		var m_SwipeAccel = 0.075; // Higher value results in more sensitive swipe response on expanded hexagons
		var m_ResizeDebounceMS = 250;
		var m_ElemTop = 0,
			m_ElemBtm = 0;

		var m_Scroller = performance.scroll(function( pos ){

			m_CheckScrollPos( pos.y );

		}).start();

		var m_TopMargin = 100;

		function init() {

			$container = $("#hexagon-container");
			$hexagonShadowSmall = $("#hexagon-shadow-small");
			$hexagonOverlay = $("#hexagon-overlay");
			$hexagonOverlay.$hexagonOverlayDescription = $("#hexagon-overlay-description");
			$hexagonOverlay.$hexagonOverlayYear = $("#hexagon-overlay-year");
			$hexagonOverlay.$hexagonOverlayIcon = $("#hexagon-overlay-icon");
			$hexagonOverlay.$hexagonOverlayStatisticsMarkets = $("#hexagon-overlay-statistics-markets");
			$hexagonOverlay.$hexagonOverlayStatisticsWebsites = $("#hexagon-overlay-statistics-websites");
			$hexagonOverlay.$hexagonOverlayStatisticsLanguages = $("#hexagon-overlay-statistics-languages");

			for (var i = 0;i<timelineJSONData.length;i++) {

				var data = timelineJSONData[i];
				var element = document.createElement('div');
				var $element = $(element);

				$element.addClass("hexagon");
				var image = data[7];

				if (image=="") {
					$element.addClass("hexagon-orange");
					$element.append("<p>"+data[8]+"</p>");
				} else {
					$element.append("<img src='"+image+"'>");
				}

				var item = {
					time:data[1], // for sorting
					element:element,
					model: {
						image:image,
						title:data[8],
						description:data[9],
						year:data[3],
						websites:data[4],
						markets:data[5],
						languages:data[6],
						x:parseInt(data[1]),
						y:parseInt(data[2])
					},
					state: {}
				};

				items.push(item);

				$element.item = item;
				element.item = item;

				$container.prepend(element);

				if (isFullDesktopView) {

					$element.mouseenter(function() {

						if (!initialisedFlag) return;

						if (!this.item.state.isOpen) {

							if (!this.item.state.isRolledOver) {

								TweenLite.set(this, {transformPerspective:400,zIndex:1000});
								TweenLite.to(this, 0.25, {"rotationY":-40});

								TweenLite.set($hexagonShadowSmall[0], {opacity:0,transformPerspective:400,zIndex:500,"left":this.item.state.x+20,"top":this.item.state.y+15,"rotationY":0,visibility:"visible"});
								TweenLite.to($hexagonShadowSmall[0], 0.25, {opacity:0.3,"rotationY":10,"left":this.item.state.x+50});

								this.isRolledOver = true;
							}
						}
					});

					$element.mouseleave(function() {

						if (!initialisedFlag) return; // if it's still initialising don't allow interaction

						if (!this.item.state.isOpen) {

							TweenLite.to(this, 0.25, {"rotationY":0,"scale":1, onComplete:function(that){
								that.item.state.isRolledOver=false;
							}, onCompleteScope:this, onCompleteParams: [ this ] });
							TweenLite.set(this, {zIndex:10});
							TweenLite.set($hexagonShadowSmall[0], {"visibility":"hidden"});
						}
					});
				}

				$element.click(function() {

					if (!initialisedFlag) return; // if it's still initialising don't allow interaction

					openHexagon( this.item );
				});
			};


			var furthestX = 0;
			for( var hex = 0; hex < timelineJSONData.length; hex++ ){

				if( parseInt(timelineJSONData[ hex ][1]) > furthestX ){
					furthestX = parseInt(timelineJSONData[ hex ][1]);
				}
			}
			numItemsWide = furthestX + 1;

			$('#scroll-container').on('scroll',function(){
				m_SetScrollBarPos();
			});

			$("#hexagon-close-button").click(function(){
				m_CloseActiveHex();
			});

			// Stops the clickaway handler firing if a hex has been clicked
			$('.hexagon').on('click',function(e){
				e.stopPropagation();
			});

			// Clickaway handler to close open hex
			$container.on('click',function(){
				m_CloseActiveHex();
			});

			$("#timeline-arrow-left").click( function() {openHexagon(activeOpenItem,-1)} );
			$("#timeline-arrow-right").click( function() {openHexagon(activeOpenItem,1)} );

			var hammer = new Hammer($hexagonOverlay[0]);

			hammer.on("panstart", function(ev) {

				touchAngle = 0;
			});

			hammer.on("pan", function(ev) {

				var oldAngle = touchAngle;

				touchAngle += ev.deltaX*m_SwipeAccel;

				if( touchAngle > m_MaxSwipeAngle ){
					touchAngle = m_MaxSwipeAngle;
				}else if( touchAngle < -m_MaxSwipeAngle ){
					touchAngle = -m_MaxSwipeAngle;
				}

				var handled=false;

				if( !m_SwipedToNext ){

					if (touchAngle>=m_MaxSwipeAngle) {
						openHexagon(activeOpenItem,1);
						handled=true;
						m_SwipedToNext = true;
						TweenLite.to($hexagonOverlay[0],1,{rotationY:0});
						touchAngle=0;
					}

					if (touchAngle<=-m_MaxSwipeAngle) {
						openHexagon(activeOpenItem,-1);
						handled=true;
						m_SwipedToNext = true;
						TweenLite.to($hexagonOverlay[0],1,{rotationY:0});
						touchAngle=0;
					}
				}

				if (!handled && !m_SwipedToNext) TweenLite.set($hexagonOverlay[0],{rotationY:touchAngle});
			});

			hammer.on("panend", function(ev) {

				touchAngle = 0;
				TweenLite.to($hexagonOverlay[0],1,{rotationY:0});
				m_SwipedToNext = false;
			});

			items.sort(function(a, b){ return a.time-b.time });

			$firstHex = $( '.hexagon' ).eq(0); // assumes at least one hexagon
			$scrollingContent = $('#hexagon-container, #hexagon-axis-horizontal');
			$timelineContainer = $('#timeline-container');
			$scrollBar = $('#timeline-scroll-bar');
			$scrollControls = $('#timeline-scroll-controls');
			$scrollBarWrapper = $('#scroll-bar-wrapper');
			$scrollContainer = $('#scroll-container');
			$scrollBtnLeft = $('#timeline-scroll-left');
			$scrollBtnRight = $('#timeline-scroll-right');

			onResizeTimeline();

			$( window ).resize(_.debounce(onResizeTimeline, m_ResizeDebounceMS));

			m_ElemTop = $timelineContainer.offset().top;
			m_ElemBtm = $timelineContainer.offset().top + $timelineContainer.height();

			m_CheckScrollPos( $wndw.scrollTop() );

			globalDispatcher.on('change.Breakpoints', function( current, prev ){
				
				m_Breakpoint.current = current;
				m_Breakpoint.prev = prev;

				onResizeTimeline();

				$wndw.trigger('resize'); // Fixes ordering issue with ipad event response
			});
			
			$scrollBar.on('mousedown touchstart',function(){
				updateScrollBar = true;
			});
			$('body').on('mouseup touchend',function(){
				updateScrollBar = false;
			});
			$('body').on('mousemove touchmove',function(e){

				if( updateScrollBar ){

					var pageX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
					var deltaX = pageX - prevMouseX;

					m_ScrollTimeline( deltaX );
				}

				prevMouseX = pageX;
			});
			$timelineContainer.on('mouseleave',function(){
				updateScrollBar = false;
			});
			$scrollBtnLeft.on('click',function(){
				m_ScrollTimeline( -btnScrollStep );
			});
			$scrollBtnRight.on('click',function(){
				m_ScrollTimeline( btnScrollStep );
			});

			$wndw.on('scroll',function(){
				m_VerticallyCenterOpenHex();
			});
		}

		function m_CloseActiveHex(){

			// send active hexagon to home position
			var activeEl = activeOpenItem.element;

			TweenLite.to(activeOpenItem.element, 0.5, {"left":activeOpenItem.state.x,"top":activeOpenItem.state.y,"rotationY":0, scale:1,position:"absolute",onComplete:function(){

				TweenLite.set(activeEl, {zIndex:10});

			}, onCompleteScope:this});
			
			closeHexagon(activeOpenItem);
		}

		function closeHexagon(item) {

			if (activeOpenItem) activeOpenItem.state.isOpen = false;
			activeOpenItem = undefined;
			scrollOffset = $('#scroll-container').scrollLeft();

			TweenLite.to($hexagonOverlay[0], 0.5, {
				"left":item.state.x+hexWidth/2-largeHexWidth/2 - scrollOffset +"px",
				"top":item.state.y+hexHeight/2-largeHexHeight/2+"px",
				"rotationY":180,scale:1,
				ease:Linear.ease,
				onComplete:function(){
					TweenLite.set($hexagonOverlay[0], {visibility:"hidden"});
				}
			});

			$("#timeline-arrow-left").hide();
			$("#timeline-arrow-right").hide();
		}

		function getNextTime(item,offset) {

			var index = items.indexOf(item);
			index += offset;

			if ((index>=0)&&(index<items.length)) {
				return items[index];
			} else {
				return false;
			}
		}

		function fillLargeHexagon(item) {

			$hexagonOverlay.$hexagonOverlayDescription.text(item.model.description);
			$hexagonOverlay.$hexagonOverlayYear.text(item.model.year);

			if (item.model.image!="") {

				$hexagonOverlay.$hexagonOverlayIcon.show().css({"background-image":"url('"+item.model.image+"')"});
				
			} else {

				$hexagonOverlay.$hexagonOverlayIcon.hide();
			
			}

			if (item.model.markets==0) {
					$hexagonOverlay.$hexagonOverlayStatisticsMarkets.parent().hide();
			} else {
				$hexagonOverlay.$hexagonOverlayStatisticsMarkets.text(item.model.markets).parent().show();
			}

			if (item.model.languages==0) {
					$hexagonOverlay.$hexagonOverlayStatisticsLanguages.parent().hide();
			} else {
				$hexagonOverlay.$hexagonOverlayStatisticsLanguages.text(item.model.languages).parent().show();
			}

			if (item.model.websites==0) {
					$hexagonOverlay.$hexagonOverlayStatisticsWebsites.parent().hide();
			} else {
				$hexagonOverlay.$hexagonOverlayStatisticsWebsites.text(item.model.websites).parent().show();
			}
		}

		function openHexagon(item, offset) {

			if (offset){
				var index = items.indexOf(item);
				index += offset;

				if ((index>=0)&&(index<items.length)) {
					item=items[index];
				} else {
					return;
				}
			}

			containerWidth = $('#scroll-container').width();
			scrollOffset = $('#scroll-container').scrollLeft();

			if (activeOpenItem!=undefined) {

				var activeEl = activeOpenItem.element;
				TweenLite.to(activeOpenItem.element, 0.5, {"left": activeOpenItem.state.x,"top":activeOpenItem.state.y,"rotationY":0, scale:1,position:"absolute",onComplete:function(){

					TweenLite.set(activeEl, {zIndex:10});	

				}, onCompleteScope:this});

				activeOpenItem.state.isOpen = false;
				activeOpenItem = undefined;
			}

			fillLargeHexagon(item);

			var height = $(window).height();
			var width = $(window).width();
			var scrollTop = $(window).scrollTop();

			if (containerHeight<height) {

				vOffset = containerHeight/2-largeHexHeight/2;

			} else {

				vOffset = scrollTop-$container.offset().top;

				if (vOffset<0) {

					vOffset=0; 

				} else {

					vOffset += height/2-largeHexHeight/2;

					if (vOffset>containerHeight-largeHexHeight) vOffset = containerHeight-largeHexHeight;
				}
			}

			TweenLite.set(item.element, {zIndex:1000,backfaceVisibility:"hidden"});

			TweenLite.to(item.element, 1, {
				"left":scrollOffset + containerWidth/2-hexWidth/2+"px",
				"top":vOffset+(largeHexHeight/2-hexHeight/2)+"px",
				"rotationY":225,scale:hexScaler,
				ease:Linear.ease
			});

			TweenLite.set($hexagonOverlay[0], {transformPerspective:800,zIndex:10000,visibility:"visible"});
			TweenLite.set($hexagonShadowSmall[0], {"visibility":"hidden"});		

			TweenLite.fromTo($hexagonOverlay[0], 1, {
				"left":item.state.x+hexWidth/2-largeHexWidth/2 - scrollOffset +"px",
				"top":item.state.y+hexHeight/2-largeHexHeight/2+"px",
				"rotationY":180,
				scale:largeHexScaler,
				ease:Linear.ease
			}, {
				"left":containerWidth/2-largeHexWidth/2 +"px",
				"top":vOffset+"px",
				"rotationY":360,
				scale:1,
				ease:Linear.ease,
				onComplete: m_VerticallyCenterOpenHex // if user has scrolled since the animation started, this will fix the positioning
			});

			$("#timeline-arrow-left").show();
			$("#timeline-arrow-right").show();

			item.state.isOpen = true; 
			item.state.isRolledOver = false;
			activeOpenItem = item;
		}

		function arrangeHexagons() {

			// find position for each hexagon
			for (var i = 0; i < items.length; i++) { items[i].state.gridPosition = findHexagonGridPosition(items[i],i); }

			// find highest column
			var max = 0; for (var i = grid.length - 1; i >= 0; i--) { if (grid[i]>max) max=grid[i]; };

			// set size of container accordingly
			containerHeight = (max+1.5)*(hexHeight-hexOffset) + m_TopMargin;
			$container.css({height:containerHeight+"px"});
			$("#hexagon-axis-vertical").css({width:containerHeight+"px"});

			// if container not on screen don't arrange hexagons... yet
			if (!viewportFlag) return;

			var cascadeDelay = 0.1; // seconds between each hexagon appears

			// position each hexagon
			for (var i = 0; i < items.length; i++) {

				var thisItem = items[i];
				var pixelPos = getPixelPosition(thisItem.state.gridPosition.x,thisItem.state.gridPosition.y);
				thisItem.state.x = pixelPos.x;
				thisItem.state.y = pixelPos.y;

				if (!initialisedFlag) {

					// bounce in if beginning of app
					TweenLite.fromTo(thisItem.element, 2, {
						"left":thisItem.state.x+Math.random()*300-150,
						"top":-Math.random()*300, 
						"rotationY":360*Math.floor(Math.random()*3)+90,
					}, {
						"left":thisItem.state.x,
						"top":thisItem.state.y,
						"rotationY":0,
						delay:i*cascadeDelay
					});

				} else {

					// just move otherwise
					TweenLite.set(thisItem.element, {
						"left":thisItem.state.x,
						"top":thisItem.state.y,
						rotationY:0,
						scale:1,
						position:"absolute"
					});
				}
			};

			if (!initialisedFlag)	setTimeout(function(){ initialisedFlag = true; }, 2000+(cascadeDelay*items.length*1000));

			closeHexagon(thisItem);
		}

		function getPixelPosition(xi,yi) {

			var x = xi*hexWidth + (isOdd(yi)?hexWidth/2:0) + gridXOffset;
			var y = (containerHeight-hexHeight) - ( yi*(hexHeight-hexOffset));

			return {x:x,y:y};
		}

		function findHexagonGridPosition(item,index) {

			var x,y;

			if (isFullDesktopView) {

				x=item.model.x-1;
				y=item.model.y-1;
			
			} else {

				x = index%gridWidth;
				y = (index-x)/gridWidth;

			}

			if (grid[x]<y) grid[x]=y;

			return {x:x,y:y};
		}

		function isOdd( x ) {

			return !( x % 2 == 0 );
		};

		function setUpHexagonGrid() {

			gridWidth = Math.floor(containerWidth/(hexWidth)) -1;
			gridXOffset = (containerWidth-(gridWidth+0.5)*hexWidth)/2;
			grid=[];

			for (var i = gridWidth - 1; i >= 0; i--) { grid.push(0); };
		}

		function onResizeTimeline() {

			console.log("resize handler");

			containerWidth = $container.width();
			windowHeight = $wndw.height();

			// New breakpoint code
			isFullDesktopView = m_Breakpoint.current.name == "large" || m_Breakpoint.current.name == "xlarge";

			hexWidth = $($(".hexagon")[0]).width();

			hexSin = Math.sin(Math.PI/3);
			hexRadius = hexWidth /2/hexSin;
			hexHeight = hexRadius * 2;
			hexM = hexWidth / 2;
			hexOffset = Math.sqrt(hexRadius*hexRadius-hexM*hexM);

			$(".hexagon").css({height:hexHeight+"px"});

			TweenLite.set($hexagonShadowSmall[0],{width:hexWidth,height:hexHeight});

			largeHexWidth = $($("#hexagon-overlay")[0]).width();
			largeHexHeight = largeHexWidth / hexSin;
			$("#hexagon-overlay").css({height:largeHexHeight+"px"});
			largeHexScaler = hexWidth / largeHexWidth ;
			hexScaler = largeHexWidth / hexWidth;

			setUpHexagonGrid();
			arrangeHexagons();

			setScrollableWidth();
			m_SetScrollBarPos();
		}

		function setScrollableWidth(){

			if( isFullDesktopView ){

				// Ensure scrollable area is sized correctly for the content
				var itemsWidth = ( $firstHex.width() * numItemsWide ) + 100;
				$scrollingContent.width( itemsWidth );
				$timelineContainer.css({ 'max-width': itemsWidth + 'px' });

				// Set scroll bar scrubber width
				scrollBarRatio = $timelineContainer.width() / $container.width();
				var scrubberWidth = ( scrollBarRatio ) * 100;

				// Ensure scrubber width never exceeds 100%
				if( scrubberWidth > 100 ){
					scrubberWidth = 100;
				}

				$scrollBar.css({ 'width': scrubberWidth + '%' });

			}else{

				$scrollingContent.width( '100%' );
			}

			// Hide scroll controls if they are not needed (full timeline content visible)
			scrubberWidth >= 100 ? $scrollControls.addClass('hide') : $scrollControls.removeClass('hide');
		}

		function m_SetScrollBarPos(){

			var sbLeft = ( $scrollContainer.scrollLeft() * scrollBarRatio ) * ( $scrollBarWrapper.width() / $scrollContainer.width() );
			$scrollBar.css({ 'margin-left': sbLeft + 'px' });
		}
		
		function m_ScrollTimeline( deltaX ){

			var leftAmt = $scrollContainer.scrollLeft() + ( deltaX / scrollBarRatio );
			var leftMax = ($container.width() - $scrollContainer.width()) - 1;
			$scrollContainer.scrollLeft( leftAmt );
		}

		function m_CheckScrollPos( pos ){

			// If we are in view, start the intro animation
			if( pos + windowHeight > m_ElemTop && pos < m_ElemBtm ){

				viewportFlag = true;
				onResizeTimeline();
				m_Scroller.stop();
			}
		}

		function m_VerticallyCenterOpenHex(){

			var vOffset;
			var height = $wndw.height();
			var scrollTop = $wndw.scrollTop();

			if (containerHeight<height) {

				vOffset = containerHeight/2-largeHexHeight/2;

			} else {

				vOffset = scrollTop-$container.offset().top;

				if (vOffset<0) {

					vOffset=0; 

				} else {

					vOffset += height/2-largeHexHeight/2;

					if (vOffset>containerHeight-largeHexHeight) vOffset = containerHeight-largeHexHeight;
				}
			}

			$hexagonOverlay.css({ 'top': vOffset + 'px' });
		}
		
		init();
	}
});