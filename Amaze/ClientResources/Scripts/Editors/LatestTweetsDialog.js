define("amaze/editors/LatestTweetsDialog", [
// Dojo
     "dojo",
        "dojo/_base/json",
        "dojo/query",
        "dojo/store/Memory",
        "dojo/_base/declare",
        "dojo/_base/Deferred",
        "dojo/dom-construct",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/_base/connect",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/query",
        "dojo/aspect",
        "dojo/topic",
//dojox
        "dojox/html/entities",
// Dijit
        "dijit/_CssStateMixin",
        "dijit/_Widget",
        "dijit/layout/_LayoutWidget",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
// EPi Framework
        "epi",
        "epi/dependency",
        "epi/shell/command/_WidgetCommandProviderMixin",
        "epi/shell/command/withConfirmation",
        "epi/shell/widget/_ValueRequiredMixin",
        "epi/shell/dgrid/Formatter",
        "epi/cms/dgrid/DnD",
// dgrid
        "dgrid/OnDemandGrid",
        "dgrid/Selection",
        "dgrid/Keyboard",
// bonnier/grid
     "amaze/editors/LatestTweetsDialogDGrid",
// EPi CMS
        "epi/cms/contentediting/NewContentNameInputDialog",
        "epi/shell/widget/dialog/Dialog",
        "epi/shell/_ContextMixin",
        "dojo/text!././templates/LatestTweetsDialog.html"
],
    function (
// Dojo
        dojo,
        json,
        Memory,
        query,
        declare,
        Deferred,
        domConstruct,
        lang,
        array,
        connect,
        domStyle,
        domClass,
        query,
        aspect,
        topic,
//dojox
        htmlEntities,
// Dijit
        _CssStateMixin,
        _Widget,
        _LayoutWidget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
// EPi Framework
        epi,
        dependency,
        _WidgetCommandProviderMixin,
        withConfirmation,
        _ValueRequiredMixin,
        Formatter,
        DnD,
// dgrid
        OnDemandGrid,
        dgridSelection,
        Keyboard,
// bonnier/grid
LatestTweetsDialogDGrid,
// EPi CMS
        NewContentNameInputDialog,
        Dialog,
        _ContextMixin,
        template
    ) {
        return declare("amaze/editors/LatestTweetsDialog", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _ContextMixin, _CssStateMixin, _ValueRequiredMixin], {
            templateString: template,
           
            grid: null,

            registry: null,
            
            store: null,

            context: null,

            dialog: null,

            source: [],
            
            latesttweets:[],
            
            gridSource: [],

            _subscribeHandlers: [],

            currentEditingID: null,

            SourceLength: null,

            EditingGUID: null,

            contentVersionStore: null,

            contextId: null,
          
            
            postCreate: function () {
                this.inherited(arguments);
              
                this._initialDgrid();
            },
            //initial dgrid
            _initialDgrid: function () {
                this.registry = this.registry || dependency.resolve("epi.storeregistry");
                this.store = this.store || this.registry.get("latesttweetsstore");
                this.grid = new LatestTweetsDialogDGrid();
                this.grid.placeAt(this.latestTweetsGrid, "only");

                this.context = this.getCurrentContext();
                this.contextId = this.context.id;
                var tempList = '[]';
                //dojo.when(this.store.executeMethod("GetLatestTweets", ''), dojo.hitch(this, function (parent) {
                //    //array.forEach(parent, lang.hitch(this, "_addDefaultvalue"));
                //    tempList = parent;
                //}));
                //dojo.when(this.store.executeMethod("GetLatestTweets", "", {  }), lang.hitch(this, function (data) {
                //    if (data != null) {
                //        tempList = data;
                //       // this.set("value", tempList);
                //    }
                //}));
               
                var xhrArgs = {
                    url: "/modules/app/Stores/latesttweetsstore/",
                    handleAs: "json",
                    sync: true,
                    preventCache: true,
                    load: function (data) {
                        if (data != null) {
                            tempList = data;
                        }
                    },
                    error: function (error) {
                        alert("An unexpected error occurred: " + error);
                    }
                };

                var deferred = dojo.hitch(this, dojo.xhrGet(xhrArgs));

               // this.set("latesttweets", tempList);
                if (this.grid != null) {
                    //this.gridSource = dojo.fromJson(tempList);
                    //this.gridSource = dojo.fromJson("{text: 5, link: 3}");
                    this.grid.set("source",tempList);
                }
               // this.value = tempList;
            },
            // Setter for value property
            _setLatestTweetsAttr: function (value) {
                if (this.grid != null) {
                    //this.gridSource = dojo.fromJson(tempList);
                    //this.gridSource = dojo.fromJson("{text: 5, link: 3}");
                    this.grid.set("source", value);
                }
            },
            _PropertyReIndentified: function (list) {
                for (var i = 0; i < list.length; i++) {
                    list[i].index = i;
                }
                return list;
            },
            _setValueAttr: function (value) {
                //if (this.grid != null) {
                //    this.gridSource = dojo.fromJson(value);
                //    this.grid.set("source", this.gridSource);
                //}
                //if (value != null) {
                //    //this.txtQuickPollQuestion.set("value", value.answer);
                //    //this.currentEditingID = value.id; //int
                //    this.EditingGUID = value.guid; //guid
                //} else {
                //   // this.txtQuickPollQuestion.set("value", '');
                //    //this.currentEditingID = null; //int
                //    this.EditingGUID = null; //guid
                //}
            },

            _getValueAttr: function () {
                var selectedTweets = this.grid.get("value");
                return selectedTweets;
            },

            destroy: function () {
                if (this._subscribeHandlers) {
                    array.forEach(this._subscribeHandlers, function (handler) {
                        connect.unsubscribe(handler);
                    });

                    delete this._subscribeHandlers;
                }
                this.inherited(arguments);
            }
        });
    });