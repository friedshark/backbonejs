define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\r\n<div class=\"image-grid__wrap\">\r\n\r\n"
    + ((stack1 = this.invokePartial(partials['_image-grid-portrait-image'],((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.portrait : stack1),{"name":"_image-grid-portrait-image","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n    <div class=\"image-grid__grouped\">\r\n"
    + ((stack1 = this.invokePartial(partials['_image-grid-landscape-image'],((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1['landscape-1'] : stack1),{"name":"_image-grid-landscape-image","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = this.invokePartial(partials['_image-grid-landscape-image'],((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1['landscape-2'] : stack1),{"name":"_image-grid-landscape-image","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "    </div>\r\n\r\n</div>";
},"usePartial":true,"useData":true})

});