define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<article id=\"angle-carousel-text\" class=\"angle-carousel__cta\">\r\n\r\n    <a href=\""
    + alias3(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"href","hash":{},"data":data}) : helper)))
    + "\" class=\"angle-carousel__cta-link\" data-cta>\r\n\r\n        <h1 class=\"angle-carousel__text angle-carousel__text--title text--xxlarge\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n        <p class=\"angle-carousel__text angle-carousel__text--caption text--large\">"
    + alias3(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"caption","hash":{},"data":data}) : helper)))
    + "</p>\r\n\r\n    </a>\r\n\r\n</article>\r\n";
},"useData":true})

});