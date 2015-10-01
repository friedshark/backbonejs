define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"site__max-element-width\">\r\n	<div class=\"grid\">\r\n		<div class=\"grid__item one-whole medium--six-eighths push--medium--one-eighth large--eight-twelfths push--large--two-twelfths\">\r\n\r\n			<article class=\"article grid-article\" data-grid-content>\r\n\r\n				<div class=\"article__pad\">\r\n\r\n					<h1 class=\"text--xxlarge grid-article__heading\">\r\n						Error "
    + this.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "\r\n					</h1>\r\n\r\n				</div>\r\n\r\n			</article>\r\n\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true})

});