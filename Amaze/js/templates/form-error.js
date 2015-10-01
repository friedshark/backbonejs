define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"grid grid--center\">\r\n    <div class=\"grid__item one-whole medium--six-eighths large--eight-twelfths\">\r\n    	<div class=\"editorial error-container\">\r\n			<h1 class=\"text--xxlarge\">\r\n				Error "
    + this.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "\r\n			</h1>\r\n    	</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true})

});