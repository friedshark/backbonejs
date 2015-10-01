define([
// Dojo
        "dojo",
        "dojo/_base/declare",
        "dojo/aspect",
//CMS
        "epi/_Module",
        "epi/dependency",
        "epi/routes",
        "epi/cms/store/CustomQueryEngine"
        //"niteco/press/QCT/MyCommandProvider"
], function (
// Dojo
        dojo,
        declare,
        aspect,
//CMS
        _Module,
        dependency,
        routes,
        CustomQueryEngine
    //MyCommandProvider
    ) {

    return declare("amaze/ModuleInitializer", [_Module], {
        initialize: function () {

            this.inherited(arguments);

            var registry = this.resolveDependency("epi.storeregistry");
            registry.create("latesttweetsstore", this._getRestPath("latesttweetsstore"));
            registry.create("tagsstore", this._getRestPath("tagsstore"));
            //registry = this.registry || dependency.resolve("epi.storeregistry");
            //this.store = this.store || registry.get("qctstore");
            //this.store.query({ category: "value" }).forEach(function(value) {
            //    var commandregistry = dependency.resolve("epi.globalcommandregistry");
            //    commandregistry.registerProvider("epi.cms.globalToolbar", new MyCommandProvider({
            //        label: value.name,
            //        type: value.value
            //    }));
            //});
        },

        _getRestPath: function (name) {
            return routes.getRestPath({ moduleArea: "app", storeName: name });
        }
    });
});