define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " article-grid__flex-half";
},"3":function(depth0,helpers,partials,data) {
    return " article-grid__flex-whole";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials['_tweet-item-partial'],depth0,{"name":"_tweet-item-partial","data":data,"indent":"            ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\r\n<article class=\"tweet tweet--flex"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,(depth0 != null ? depth0.display : depth0),"half",{"name":"is","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,(depth0 != null ? depth0.display : depth0),"full",{"name":"is","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n         data-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\r\n         data-types=\"tweet\"\r\n         data-services=\"tweet\"\r\n         data-year=\"tweet\"\r\n         data-display=\"half\"\r\n         data-type=\"Tweet\"\r\n         data-grid-item\r\n         data-require=\"views/tweetView\"\r\n         data-tweet-item>\r\n\r\n    <div class=\"tweet__bg "
    + alias3(((helper = (helper = helpers.theme || (depth0 != null ? depth0.theme : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"theme","hash":{},"data":data}) : helper)))
    + "\"></div>\r\n\r\n    <div class=\"tweet__inner\">\r\n\r\n        <div class=\"tweet__items\" data-tweet-items>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tweets : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n        </div>\r\n\r\n    </div>\r\n\r\n</article>";
},"usePartial":true,"useData":true})

});