define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

Handlebars.registerPartial("_show-more", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"btn-wrap btn-wrap--wide\" data-show-more>\r\n    <button type=\"button\" class=\"btn btn--diamond\"><span class=\"icon icon--more-content\"></span></button>\r\n	<span class=\"btn-wrap__text\">Show more</span>\r\n</div>\r\n";
},"useData":true}));

});