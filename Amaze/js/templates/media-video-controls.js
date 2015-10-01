define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\r\n    <div class=\"media__controls-bar media__controls-bar--floating\">\r\n\r\n        <button type=\"button\" class=\"media__control "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.playing : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "btn btn--diamond btn--media\" data-control=\"play\">\r\n			<span class=\"icon icon--playvideo\">\r\n				<span class=\"vh\">Play</span>\r\n			</span>\r\n        </button>\r\n\r\n        <button type=\"button\" class=\"media__control "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.playing : depth0),{"name":"unless","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "btn btn--diamond btn--media\" data-control=\"pause\">\r\n			<span class=\"icon icon--pause\">\r\n				<span class=\"vh\">Pause</span>\r\n			</span>\r\n        </button>\r\n\r\n        <div class=\"media__control-time\"><span class=\"media__time\" data-time>"
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span>/<span class=\"media__time\" data-duration>"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</span></div>\r\n\r\n        <div class=\"media__control-track\" data-view=\"MediaControlsSeek\">\r\n            <div class=\"media__control-track-progress\" data-progress></div>\r\n            <div class=\"media__control-track-progress media__control-track-progress--seek\" data-seek></div>\r\n        </div>\r\n\r\n        <div class=\"media__control-sound\">\r\n\r\n            <div class=\"media__control-volume-wrapper\">\r\n	            <div class=\"media__control-volume\" data-view=\"MediaControlsVolume\">\r\n	                <div class=\"media__control-volume-inner\">\r\n	                    <div class=\"media__control-volume-level\" data-level></div>\r\n	                </div>\r\n	            </div>\r\n	        </div>\r\n\r\n            <button type=\"button\" class=\"media__control media__control--mute "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.muted : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "btn btn--diamond btn--media\" data-control=\"mute\">\r\n				<span class=\"icon icon--audio\">\r\n					<span class=\"vh\">Mute</span>\r\n				</span>\r\n            </button>\r\n\r\n            <button type=\"button\" class=\"media__control media__control--unmute "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.muted : depth0),{"name":"unless","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "btn btn--diamond btn--media\" data-control=\"unmute\">\r\n				<span class=\"icon icon--mute\">\r\n					<span class=\"vh\">Unmute</span>\r\n				</span>\r\n            </button>\r\n\r\n        </div>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.fullscreenEnabled : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </div>\r\n\r\n";
},"2":function(depth0,helpers,partials,data) {
    return " media__control--hidden ";
},"4":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"media__control media__control--fullscreen btn btn--diamond btn--media\" data-fullscreen>\r\n			<span class=\"icon icon--maximise\">\r\n				<span class=\"vh\">Fullscreen Toggle</span>\r\n			</span>\r\n        </button>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"media__controls media__controls--auto-hide\">\r\n\r\n    <button type=\"button\" class=\"media__control-close btn btn--diamond btn--media\" data-collapse>\r\n		<span class=\"icon icon--close-small\">\r\n			<span class=\"vh\">Close</span>\r\n		</span>\r\n    </button>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.controls : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
},"useData":true})

});