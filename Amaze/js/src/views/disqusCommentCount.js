define(['jquery', 'vendor/backbone'], function ($, Backbone) {

    'use strict';

    return Backbone.View.extend({

        initialize: function (opts) {
            var disqusPublicKey = $("input[id='DisqusPublicKey']").val();
            var disqusShortname = $("input[id='DisqusShortName']").val();
            var identifierArray = [];
            if (!!opts.container) {
                opts.container.find('.disqus-comment-count').each(function () {
                    var identifier = $(this).attr('data-disqus-identifier');
                    identifierArray.push('ident:' + identifier);
                });
            } else {
                $('.disqus-comment-count').each(function () {
                    var identifier = $(this).attr('data-disqus-identifier');
                    identifierArray.push('ident:' + identifier);
                });
            }

            if (identifierArray.length > 0) {
                Backbone.ajax({
                    type: 'GET',
                    url: "https://disqus.com/api/3.0/threads/set.jsonp",
                    data: { api_key: disqusPublicKey, forum: disqusShortname, thread: identifierArray }, // URL method
                    cache: false,
                    dataType: "jsonp",
                    success: function (result) {
                        for (var i in result.response) {
                            var count = result.response[i].posts;
                            if (!!opts.container) {
                                opts.container.find('span[data-disqus-identifier="' + result.response[i].identifiers[0] + '"]').html(count);
                            } else {
                                $('span[data-disqus-identifier="' + result.response[i].identifiers[0] + '"]').html(count);
                            }
                        }
                    }
                });
            };
        },
    });
});
