define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<g class=\"angle-carousel__slide\" xmlns=\"http://www.w3.org/2000/svg\" clip-path=\"url(#clip"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + ")\" data-view=\""
    + alias3(((helper = (helper = helpers.view || (depth0 != null ? depth0.view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"view","hash":{},"data":data}) : helper)))
    + "\" data-href=\""
    + alias3(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"href","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n	<image xlink:href=\""
    + alias3(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"xMidYMid slice\" x=\"0\" y=\"0\" height=\"100%\" width=\"100%\"/>\r\n\r\n</g>\r\n";
},"useData":true})

});