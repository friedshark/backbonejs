define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

Handlebars.registerPartial("_image-grid-landscape-image", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\r\n<div class=\"image-grid__item image-grid__item--small\">\r\n	<div class=\"image-grid__item-inner image-grid__item--small-inner\">\r\n		<picture>\r\n	        <source media=\"(min-width: 64rem)\" srcset=\""
    + alias3(((helper = (helper = helpers.large || (depth0 != null ? depth0.large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"large","hash":{},"data":data}) : helper)))
    + "\" />\r\n	        <source media=\"(min-width: 40rem)\" srcset=\""
    + alias3(((helper = (helper = helpers.medium || (depth0 != null ? depth0.medium : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"medium","hash":{},"data":data}) : helper)))
    + "\" />\r\n	        <source media=\"(min-width: 30rem)\" srcset=\""
    + alias3(((helper = (helper = helpers.small || (depth0 != null ? depth0.small : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"small","hash":{},"data":data}) : helper)))
    + "\" />\r\n	        <img src=\""
    + alias3(((helper = (helper = helpers.base || (depth0 != null ? depth0.base : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"base","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.altText || (depth0 != null ? depth0.altText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"altText","hash":{},"data":data}) : helper)))
    + "\" class=\"image-grid__item-img image-grid__item--small-img\" />\r\n	    </picture>\r\n    </div>\r\n</div>\r\n\r\n";
},"useData":true}));

});