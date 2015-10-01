define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <clipPath id=\"clip"
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" clipPathUnits=\"objectBoundingBox\">\r\n            <polygon points=\"0,0,1,0,1,1,0,1,0,0\" />\r\n        </clipPath>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<svg id=\"angle-carousel-slides\" class=\"angle-carousel__slides angle-carousel__slides--active\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" tabindex=\"0\">\r\n\r\n    <defs>\r\n        <clipPath id=\"mask\" clipPathUnits=\"objectBoundingBox\">\r\n            <polygon points=\"0,0,1,0,1,1,0,1,0,0\" />\r\n        </clipPath>\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </defs>\r\n\r\n    <g class=\"angle-carousel__mask\" clip-path=\"url(#mask)\" id=\"container\"></g>\r\n\r\n</svg>\r\n";
},"useData":true})

});