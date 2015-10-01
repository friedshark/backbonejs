define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " media__control--hidden";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"media__controls media__controls--audio\">\r\n\r\n    <div class=\"media__controls-bar\">\r\n\r\n        <button type=\"button\" class=\"media__control media__control--discrete "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.playing : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" data-control=\"play\">\r\n            <span class=\"icon icon--playvideo\">\r\n                <span class=\"vh\">Play</span>\r\n            </span>\r\n        </button>\r\n\r\n        <button type=\"button\" class=\"media__control media__control--discrete "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.playing : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" data-control=\"pause\">\r\n            <span class=\"icon icon--pause\">\r\n                <span class=\"vh\">Pause</span>\r\n            </span>\r\n        </button>\r\n\r\n        <div class=\"media__control-time vh\"><span class=\"media__time\" data-time>"
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span>/<span class=\"media__time\" data-duration>"
    + alias3(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</span></div>\r\n\r\n        <div class=\"media__control-track media__control-track--discrete\" data-view=\"MediaControlsSeek\">\r\n            <div class=\"media__control-track-progress\" data-progress></div>\r\n            <div class=\"media__control-track-progress media__control-track-progress--seek\" data-seek></div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n";
},"useData":true})

});