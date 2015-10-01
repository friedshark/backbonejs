define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "icon--edit";
},"3":function(depth0,helpers,partials,data) {
    return "icon--arrow-right";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias3(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"classes","hash":{},"data":data}) : helper)))
    + " frm-file-augmented btn btn--square btn--square-icon btn--icon\" data-file>\r\n    <span data-value>"
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "</span>\r\n    <span class=\"icon "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\r\n</label>\r\n";
},"useData":true})

});