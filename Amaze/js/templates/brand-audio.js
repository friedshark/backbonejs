define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<audio src=\""
    + this.escapeExpression(((helper = (helper = helpers.audioUrl || (depth0 != null ? depth0.audioUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"audioUrl","hash":{},"data":data}) : helper)))
    + "\" preload=\"auto\">\r\n    <p>Your browser does not support audio.</p>\r\n</audio>";
},"useData":true})

});