define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "			<li class=\"frm-nav__item\" role=\"tab\">\r\n				<button type=\"button\" class=\"frm-nav__step "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,(depth0 != null ? depth0.valid : depth0),false,{"name":"is","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + " aria-controls=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-nav=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n					<span class=\"frm-nav__step-count\">\r\n						<span class=\"frm-nav__step-label\">Step</span>"
    + alias3(((helper = (helper = helpers.step || (depth0 != null ? depth0.step : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"step","hash":{},"data":data}) : helper)))
    + "\r\n					</span>\r\n					<span class=\"frm-nav__step-title\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n				</button>\r\n			</li>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "frm-nav__step--active";
},"4":function(depth0,helpers,partials,data) {
    return "disabled=\"disabled\"";
},"6":function(depth0,helpers,partials,data) {
    return "aria-selected=\"true\"";
},"8":function(depth0,helpers,partials,data) {
    return "aria-selected=\"false\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<nav class=\"frm-nav\">\r\n	<ol class=\"frm-nav__items\" role=\"tablist\">\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ol>\r\n</nav>\r\n";
},"useData":true})

});