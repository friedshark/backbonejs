define([
// dojo
        "dojo",
        'dojo/_base/json',
        "dojo/dom",
        "dojo/_base/array",
        "dojo/_base/connect",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/topic",
        "dojo/dom-attr",
        "dojo/dom-construct",
        "dojo/query",
        "dojo/dom-style",
        "dojo/_base/Deferred",
// dijit
        "dijit/_CssStateMixin",
        "dijit/_Widget",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
// DGrid
        "dgrid/OnDemandGrid",
        "dgrid/Selection",
        "dgrid/Keyboard",
// epi framework
        "epi/dependency",
        "epi/epi",
        "epi/shell/widget/_ValueRequiredMixin",
        "epi/shell/dgrid/Formatter",
        "epi/cms/_ContentContextMixin",
// epi cms
        "epi/cms/dgrid/DnD",
        "epi/shell/widget/dialog/Dialog",
        "epi/shell/_ContextMixin",
// bonnier/grid
        "amaze/editors/LatestTweetsDialog",
        "amaze/requiremodule!App",
        "amaze/editors/LatestTweetsDGrid",
     "epi/i18n!epi/cms/nls/webeditorial.cms.components.quickpoll",
// template
        "dojo/text!././templates/LatestTwitterSelection.html"
],
    function (
// dojo
        dojo,
        json,
        dom,
        array,
        connect,
        declare,
        lang,
        topic,
        domAttr,
        domConstruct,
        query,
        domStyle,
        Deferred,
// dijit 
        _CssStateMixin,
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
// DGrid
        OnDemandGrid,
        dgridSelection,
        Keyboard,
// epi framework
        dependency,
        epi,
        _ValueRequiredMixin,
        Formatter,
        _ContentContextMixin,
// epi cms
        DnD,
        Dialog,
        _ContextMixin,
// bonnier/grid
        LatestTweetsDialog,
        appModule,
        LatestTweetsDGrid,
        langResources,
// template
        template
    ) {
        return declare("amaze/editors/LatestTwitterSelection", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _CssStateMixin, _ValueRequiredMixin, _ContextMixin, _ContentContextMixin],
            {
                templateString: template,

                dialog: null,

                _LatestTwitterPopup: null,

                dgrid: null,

                value: null,

                tweets: null,

                _WidgetResult: null,

                dgridSource: [],

                _subscribeHandlers: [],

                context: null,

                contexId: null,

                currentIndex: null,
                
                registry: null,
                
                store:null,

                _contextChanged: function (newContext) {
                    if (newContext) {
                        this.context = newContext;
                        this.contextId = this.context.id;
                    }
                },

                // Setter for value property
                _setTweetsAttr: function (value) {
                    this.tweets = value;
                    if (this.dgrid != null) {
                        this.dgridSource = dojo.fromJson(this.tweets);
                        this.dgrid.set("source", this._PropertyReIndentified(this.dgridSource));
                    }
                },

                postCreate: function () {
                    this.inherited(arguments);

                    this.registry = this.registry || dependency.resolve("epi.storeregistry");
                    this.store = this.store || this.registry.get("latesttweetsstore");
                   this.contentVersionStore = this.contentVersionStore || this.registry.get("epi.cms.contentversion");

                    this._initialDialog(null, false);
                    this._initialDgrid();

                    this.connect(this.dgrid, "onChangeSource", "_onChangeSourceDGrid");
                    this.connect(this.dgrid, "callDialogFromParentWidget", "_initialDialog");

                    this._subscribeHandlers.push(connect.subscribe("/epi/shell/context/changed", lang.hitch(this, "_contextChanged")));
                },
                onChange: function (value) {
                    // Event that tells EPiServer when the widget's value has changed.
                },
                //initial dgrid
                _initialDgrid: function () {
                    this.dgrid = new LatestTweetsDGrid();
                    
                    this.dgrid.placeAt(this.tweetsGridNode, "only");
                    
                    this.context = this.getCurrentContext();
                    this.contextId = this.context.id;

                    var tempList = '[]';
                    dojo.when(this.store.executeMethod("GetCurrentTweets", "", {id:this.contextId}), lang.hitch(this, function (data) {
                        if (data != null) {
                            tempList = data;
                            this.set("tweets", tempList);
                        }
                    }));
                   
                },

                //initial dialog
                _initialDialog: function (value, isOpen) {
                    this._WidgetResult = this._WidgetResult || new LatestTweetsDialog();
                    this._WidgetResult.set("value", value);

                    if (value != null) {
                        this.currentIndex = value.index;
                    }

                    if (this.dialog == null) {
                        this.dialog = new Dialog({
                            confirmActionText: "Add",
                            title: "Select latest tweets",
                            content: this._WidgetResult
                        });
                        this.connect(this.dialog, 'onExecute', '_onDialogExecute');
                        this.connect(this.dialog, 'onHide', '_onDialogHide');
                    }
                    if (isOpen) {
                        this.dialog.show();
                    }
                },

                _onDialogExecute: function () {
                    var dialogResult = this._WidgetResult.get("value");
                    var newTweets = [];
                    for (var i = 0; i < dialogResult.length; i++) {
                        var statusId = dialogResult[i].StatusId;
                        if (this.tweets==null||this.tweets.indexOf(statusId) < 0) {
                            newTweets.push(dialogResult[i]);
                        }
                    }
                    if (newTweets.length > 0) {
                        this._onSaveAddTweet(this.tweets, newTweets);
                    }
                },

                _onDialogHide: function () {

                },

                //add tweet value
                _onSaveAddTweet: function (olderTweets, dialogResult) {
                    this.registry = this.registry || dependency.resolve("epi.storeregistry");
                    this.store = this.store || this.registry.get("latesttweetsstore");
                    var self = this;
                    Deferred.when(this.store.executeMethod("AddTweets", "", { pageId: this.contextId, olderTweets: olderTweets, newTweets: dojo.toJson(dialogResult) }), lang.hitch(this, function (data) {
                        if (data.status == 4) { //status = published
                            //create new version of block when current status is publish
                            Deferred.when(this.contentVersionStore.put({ originalContentLink: this.contextId }), lang.hitch(this, function (newContentLink) {
                                this.contextId = newContentLink.contentLink;
                                Deferred.when(self.store.executeMethod("AddTweets", "", { pageId: this.contextId, olderTweets: olderTweets, newTweets: dojo.toJson(dialogResult) }), lang.hitch(this, function (newData) {

                                    this.set("tweets", newData.tweetsList);
                                    // note that our view component, OPE or form must check if we're the sender?
                                    // or just skip when a content link changed
                                    var contextParameters = { uri: "epi.cms.contentdata:///" + this.contextId };
                                    connect.publish("/epi/shell/context/request", [contextParameters, { sender: this, contentLinkSyncChange: true, trigger: "internal" }]);
                                }));
                            }));
                        } else { //status = not ready
                            this.set("tweets", data.tweetsList);
                        }
                    }));
                    
                },

                _onChangeSourceDGrid: function (updatedTweets) {
                    this.set("tweets", updatedTweets);
                    var self = this;
                    Deferred.when(this.store.executeMethod("UpdateTweets", "", { pageId: this.contextId, updatedTweets: updatedTweets }), lang.hitch(this, function (data) {
                        if (data.status == 4) { //status = published
                            //create new version of block when current status is publish
                            Deferred.when(self.contentVersionStore.put({ originalContentLink: this.contextId }), lang.hitch(this, function (newContentLink) {
                                this.contextId = newContentLink.contentLink;
                                Deferred.when(self.store.executeMethod("UpdateTweets", "", { pageId: this.contextId, updatedTweets: updatedTweets }), lang.hitch(this, function (newData) {

                                    // note that our view component, OPE or form must check if we're the sender?
                                    // or just skip when a content link changed
                                    var contextParameters = { uri: "epi.cms.contentdata:///" + this.contextId };
                                    connect.publish("/epi/shell/context/request", [contextParameters, { sender: this, contentLinkSyncChange: true, trigger: "internal" }]);
                                }));
                            }));
                        }
                    }));
                },

                _onBtnAddTweetClick: function () {
                    this._WidgetResult.set("value", null);
                    this.dialog.show();
                },

                _PropertyReIndentified: function (list) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].index = i;
                    }
                    return list;
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
            }
        );
    });