define(['vendor/handlebars', 'modules/handlebars-helpers'], function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"skew\">\r\n\r\n    <div class=\"grid\">\r\n\r\n        <div class=\"grid__item one-whole\">\r\n\r\n"
    + ((stack1 = this.invokePartial(partials._timeline,depth0,{"name":"_timeline","data":data,"indent":"            ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <canvas class=\"skew__canvas\" data-view=\"skewGradientView\" data-base-colour=\"#21232F\" data-primary-colour=\"#2461aa\" data-secondary-colour=\"#a95fce\">\r\n        <div class=\"skew__canvas radial-gradient--dark-1 trixel--light\">\r\n        </div>\r\n    </canvas>\r\n\r\n</section>\r\n";
},"usePartial":true,"useData":true})

});