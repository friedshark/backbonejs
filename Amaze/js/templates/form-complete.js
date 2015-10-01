define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "				"
    + this.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "				Sorry there seems to be a problem with your request, please try again later.\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"grid grid--center\">\r\n	<div class=\"grid__item one-whole medium--six-eighths large--eight-twelfths\">\r\n		<div class=\"editorial\">\r\n			<p class=\"lead frm-selector__text\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "			</p>\r\n\r\n			<div class=\"btn-wrap btn-wrap--wide frm-selector__cta\">\r\n			    <button type=\"button\" class=\"btn btn--diamond\" data-restart><span class=\"icon icon--close-small\"></span></button>\r\n				<span class=\"btn-wrap__text\">Close</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true})

});