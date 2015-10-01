define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <div class=\"brand__control brand__control--media\" data-control=\"watching\">\r\n\r\n        <h2>\r\n            <button type=\"button\" class=\"brand__control-toggle\" aria-controls=\"watching\" aria-expanded=\"false\" data-toggle>Watching</button>\r\n        </h2>\r\n\r\n        <div id=\"watching\" class=\"brand__expander\" aria-hidden=\"true\" data-expander>\r\n\r\n            <div class=\"brand__expander-inner editorial\" data-content>\r\n\r\n                "
    + ((stack1 = ((helper = (helper = helpers.watching || (depth0 != null ? depth0.watching : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"watching","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <div class=\"brand__control brand__control--media\" data-control=\"listening\">\r\n\r\n        <h2>\r\n            <button type=\"button\" class=\"brand__control-toggle\" aria-controls=\"listening\" aria-expanded=\"false\" data-toggle>Listening</button>\r\n        </h2>\r\n\r\n        <div id=\"listening\" class=\"brand__expander\" aria-hidden=\"true\" data-expander>\r\n\r\n            <div class=\"brand__expander-inner editorial\" data-content>\r\n\r\n                "
    + ((stack1 = ((helper = (helper = helpers.listening || (depth0 != null ? depth0.listening : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"listening","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"brand__controls-inner\">\r\n\r\n    <div class=\"brand__control\" data-control=\"living\">\r\n\r\n        <h2>\r\n            <button type=\"button\" class=\"brand__control-toggle\" aria-controls=\"living\" aria-expanded=\"false\" data-toggle>Living</button>\r\n        </h2>\r\n\r\n        <div id=\"living\" class=\"brand__expander\" aria-hidden=\"true\" data-expander>\r\n\r\n            <div class=\"brand__expander-inner editorial\" data-content=\"graphs\"></div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.watching : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.listening : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    <button type=\"button\" class=\"brand__control-toggle\" data-overlay-trigger=\"brand\" aria-controls=\"overlay\">Why a living brand?</button>\r\n\r\n</div>\r\n";
},"useData":true})

});