define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " frm-select__list--visible";
},"3":function(depth0,helpers,partials,data) {
    return "false";
},"5":function(depth0,helpers,partials,data) {
    return "true";
},"7":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <li class=\"frm-select__list-item\" role=\"presentation\"><a href=\"#\" role=\"option\" class=\"frm-select__list-option"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,((stack1 = (depths[1] != null ? depths[1].selected : depths[1])) != null ? stack1.value : stack1),(depth0 != null ? depth0.value : depth0),{"name":"is","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" data-value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.textContent || (depth0 != null ? depth0.textContent : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"textContent","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"8":function(depth0,helpers,partials,data) {
    return " frm-select__list-option--selected";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\""
    + alias3(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"classes","hash":{},"data":data}) : helper)))
    + " frm-select--augmented\" data-select>\r\n\r\n    <button type=\"button\" class=\"frm-select__toggle\" role=\"combobox\" aria-expanded=\""
    + alias3(((helper = (helper = helpers.visible || (depth0 != null ? depth0.visible : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"visible","hash":{},"data":data}) : helper)))
    + "\" aria-controls=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-select-toggle>"
    + alias3(this.lambda(((stack1 = (depth0 != null ? depth0.selected : depth0)) != null ? stack1.textContent : stack1), depth0))
    + "</button>\r\n\r\n    <ul id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"frm-select__list"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.visible : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" role=\"listbox\" aria-hidden=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.visible : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":this.program(7, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n\r\n</div>\r\n";
},"useData":true,"useDepths":true})

});