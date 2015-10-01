define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " article-grid__flex-half";
},"3":function(depth0,helpers,partials,data) {
    return " article-grid__flex-whole";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return this.escapeExpression(this.lambda(depth0, depth0))
    + ((stack1 = helpers.unless.call(depth0,(data && data.last),{"name":"unless","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"6":function(depth0,helpers,partials,data) {
    return ",";
},"8":function(depth0,helpers,partials,data) {
    return " article-summary__content--grid-full-indented";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return "			<p class=\"article-summary__onward-icons activity-icons\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showComments : depth0),{"name":"if","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showViews : depth0),{"name":"if","hash":{},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</p>\r\n";
},"11":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "				<span class=\"activity-icons__comments\"><span class=\"vh\">Comments</span><a href=\"#\"><span class=\"icon icon--comments\"></span><span data-disqus-url=\""
    + alias3(((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"comments","hash":{},"data":data}) : helper)))
    + "\" data-disqus-identifier=\""
    + alias3(((helper = (helper = helpers.contentGuid || (depth0 != null ? depth0.contentGuid : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"contentGuid","hash":{},"data":data}) : helper)))
    + "\" class=\"disqus-comment-count\">0</span></a></span>\r\n";
},"13":function(depth0,helpers,partials,data) {
    var helper;

  return "				<span class=\"activity-icons__views\"><span class=\"vh\">Views</span><span class=\"icon icon--views\"></span> "
    + this.escapeExpression(((helper = (helper = helpers.views || (depth0 != null ? depth0.views : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"views","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "\r\n<article class=\"article-summary"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,(depth0 != null ? depth0.display : depth0),"half",{"name":"is","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,(depth0 != null ? depth0.display : depth0),"full",{"name":"is","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n	data-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\r\n	data-categories=\""
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\r\n	data-month=\""
    + alias3(((helper = (helper = helpers.month || (depth0 != null ? depth0.month : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"month","hash":{},"data":data}) : helper)))
    + "\"\r\n	data-year=\""
    + alias3(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"year","hash":{},"data":data}) : helper)))
    + "\"\r\n	data-display=\""
    + alias3(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"display","hash":{},"data":data}) : helper)))
    + "\"\r\n	data-type=\""
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"\r\n	data-grid-item>\r\n\r\n	<div class=\"article-summary__image article-summary__image--triangle vsb--small-connected\">\r\n		<a href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\r\n			<!-- NOTE: Use ImageResizing.NET ?width=XXX -->\r\n			<!-- Small ~480 -->\r\n			<!-- Medium ~640 -->\r\n			<!-- Large ~1024 -->\r\n			<picture>\r\n				<source media=\"(min-width: 64rem)\" srcset=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.large : stack1), depth0))
    + "\" />\r\n				<source media=\"(min-width: 40rem)\" srcset=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.medium : stack1), depth0))
    + "\" />\r\n				<source media=\"(min-width: 30rem)\" srcset=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.small : stack1), depth0))
    + "\" />\r\n				<img src=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1['default'] : stack1), depth0))
    + "\" alt=\"\" />\r\n			</picture>\r\n		</a>\r\n	</div>\r\n\r\n	<div class=\"article-summary__content article-summary__content--indented"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias1).call(depth0,(depth0 != null ? depth0.display : depth0),"full",{"name":"is","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n\r\n		<h1 class=\"article-summary__heading text--xlarge\"><a href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></h1>\r\n\r\n		<div class=\"article-summary__summary editorial\">\r\n			<p>"
    + alias3(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</p>\r\n		</div>\r\n\r\n		<div class=\"article-summary__onward\">\r\n			<p class=\"article-summary__onward-cta\"><a href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.ctaText || (depth0 != null ? depth0.ctaText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ctaText","hash":{},"data":data}) : helper)))
    + " <span class=\"vh\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span></a></p>\r\n\r\n"
    + ((stack1 = (helpers.and || (depth0 && depth0.and) || alias1).call(depth0,(depth0 != null ? depth0.showComments : depth0),(depth0 != null ? depth0.showViews : depth0),{"name":"and","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n		</div>\r\n\r\n	</div>\r\n\r\n</article>\r\n";
},"useData":true})

});