define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <li class=\"brand__graphs-list-item\">\r\n            "
    + this.escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "\r\n            <span class=\"brand__graphs-track\">\r\n            	<span class=\"brand__graphs-line\" data-brand-graph></span>\r\n        	</span>\r\n        </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"brand__graphs\">\r\n\r\n    <ol class=\"brand__graphs-list\">\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.streams : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </ol>\r\n\r\n</div>\r\n";
},"useData":true})

});