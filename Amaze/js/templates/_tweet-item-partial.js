define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

Handlebars.registerPartial("_tweet-item-partial", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\r\n<div class=\"tweet__item\" data-tweet-item>\r\n\r\n    <div class=\"tweet__content\" data-tweet-content>\r\n        <p class=\"tweet__tweet text--medium\">\r\n            "
    + ((stack1 = ((helper = (helper = helpers.tweet || (depth0 != null ? depth0.tweet : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tweet","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n        </p>\r\n        <p class=\"tweet__via text--small\">"
    + alias3(((helper = (helper = helpers.via || (depth0 != null ? depth0.via : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"via","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n\r\n    <p class=\"tweet__meta\" data-tweet-meta>\r\n        <span class=\"tweet__reach text--small\">"
    + alias3(((helper = (helper = helpers.retweets || (depth0 != null ? depth0.retweets : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"retweets","hash":{},"data":data}) : helper)))
    + " Retweets / "
    + alias3(((helper = (helper = helpers.favourites || (depth0 != null ? depth0.favourites : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"favourites","hash":{},"data":data}) : helper)))
    + " Favourites</span>\r\n        <span class=\"tweet__actions\">\r\n            <a class=\"tweet__actions-icon\" href=\""
    + alias3(((helper = (helper = helpers.replylink || (depth0 != null ? depth0.replylink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"replylink","hash":{},"data":data}) : helper)))
    + "\"><span class=\"icon icon--tweet-reply\"></span><span class=\"vh\">Reply</span></a>\r\n            <a class=\"tweet__actions-icon\" href=\""
    + alias3(((helper = (helper = helpers.retweetlink || (depth0 != null ? depth0.retweetlink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"retweetlink","hash":{},"data":data}) : helper)))
    + "\"><span class=\"icon icon--tweet-retweet\"></span><span class=\"vh\">Retweet</span></a>\r\n            <a class=\"tweet__actions-icon\" href=\""
    + alias3(((helper = (helper = helpers.favouritelink || (depth0 != null ? depth0.favouritelink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"favouritelink","hash":{},"data":data}) : helper)))
    + "\"><span class=\"icon icon--tweet-favourite\"></span><span class=\"vh\">Favourite</span></a>\r\n        </span>\r\n    </p>\r\n\r\n</div>\r\n";
},"useData":true}));

});