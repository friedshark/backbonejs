define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"grid__item one-whole\">\r\n\r\n"
    + ((stack1 = this.invokePartial(partials['_show-more'],depth0,{"name":"_show-more","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
},"usePartial":true,"useData":true})

});