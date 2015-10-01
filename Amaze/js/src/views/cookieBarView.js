define(['vendor/backbone'], function (Backbone) {

    'use strict';

    return Backbone.View.extend({
        events: {
            'click [data-cookie-btn]': 'cookieButtonClick',
            'click': 'cookieBarClick'
        },

        initialize: function (opts) {
            if (this.checkCookieExist("AmazeCookie")) {
                this.$el.hide();
            } else {
                this.$el.show();
            }
        },

        render: function () {

            return $.Deferred().resolve(this);
        },

        cookieButtonClick: function (e) {
            e.preventDefault();
            var expriedDate = new Date();
            expriedDate.setDate(expriedDate.getDate() + 365);
            document.cookie = 'AmazeCookie=true; expires=' + expriedDate + '; path=/';
            this.$el.slideUp(700, function () { $(this).remove(); });
        },
        cookieBarClick: function (e) {
            if (!$(e.target).hasClass('cookie-bar__agree-btn')) {
                var link = this.$el.data("cookies-page");
                if (link != undefined && link != "") {
                    window.location = link;
                }
            }
        },
        checkCookieExist: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return true;
            }
            return false;
        }
    });
});