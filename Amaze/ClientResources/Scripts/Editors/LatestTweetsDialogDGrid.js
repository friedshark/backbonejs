define("amaze/editors/LatestTweetsDialogDGrid", [
// Dojo
        "dojo", "dojo/_base/json", "dojo/_base/declare", "dojo/dom-construct", "dojo/_base/lang", "dojo/store/Memory", "dojo/Stateful", "dojo/on",
// Dijit
        "dijit/_Widget", "dijit/registry",
// DGrid
        "dgrid/OnDemandGrid", "dgrid/Selection", "dgrid/Keyboard", "dgrid/editor",
// EPi Framework
        "epi/shell/command/_WidgetCommandProviderMixin", "epi/shell/selection", "epi/shell/_StatefulGetterSetterMixin", "epi/shell/_ContextMixin"
],
    function (
// Dojo
        dojo,json, declare, domConstruct, lang, Memory, Stateful, on,
// Dijit
        _Widget, registry,
// DGrid
        OnDemandGrid, dgridSelection, Keyboard, editor,
// EPi Framework
        _WidgetCommandProviderMixin, Selection, _StatefulGetterSetterMixin, _ContextMixin
    ) {
        return declare("amaze/editors/LatestTweetsDialogDGrid", [_Widget, _WidgetCommandProviderMixin, Stateful, _StatefulGetterSetterMixin, _ContextMixin], {
            grid: null,

            row: null,

            source: [],

            lstControl: [],

            currId: null,

            _setSourceAttr: function (value) {

                // this code will verity that we have source before rendering dgrid.
                if (value) {
                    this.source = value;
                }
                //var src = dojo.fromJson("{text: 5, link: 3}");
                //this.source = src;
                if (this.grid) {
                    var pageStore = new Memory({ data: value, idProperty: 'statusId' });
                    this.grid.set('store', pageStore);
                }
            },

            _getNoDataMessage: function () {
                return '<span class="epi-createBlock">\
                        <span class="dijitReset dijitInline dijitIcon epi-iconPlus"></span>\
                        <span class="dijitReset dijitInline">No data to binding</span>\
                    </span>';
            },
            constructor: function () {
                this.inherited(arguments);

                //this.selection = new Selection();
            },
            buildRendering: function () {
                this.inherited(arguments);
                // Init blocks grid
                var self = this;
                var gridClass = declare([OnDemandGrid, dgridSelection, Keyboard]);
                this.grid = new gridClass({
                    columns: {
                        tweetid: {
                            label:"Id",
                            className: "text",
                            renderCell: function (item, value, node, options) {
                                var format = "<p>{0}</p>";
                                //node.innerHTML = lang.replace(format, ["txtText", item.text]);
                                node.innerHTML = lang.replace(format, [item.statusId]);

                            }
                        },
                        text: {
                            label:"Description",
                            className: "text",
                            renderCell: function (item, value, node, options) {
                                var format = "<p id=\"{0}\">{1}</p>";
                                //node.innerHTML = lang.replace(format, ["txtText", item.text]);
                                node.innerHTML = lang.replace(format, ["pText" + item.statusId, item.text]);

                            }
                        },
                        link: {
                            label: "Link",
                            renderCell: function (item, value, node, options) {
                                var format = "<p id=\"{0}\">{1}</p>";
                                //node.innerHTML = lang.replace(format, ["txtLink" , item.link]);
                                node.innerHTML = lang.replace(format, ["pLink" + item.statusId, item.link]);
                            }
                        },
                        createdDate: {
                            label: "Created date",
                            renderCell: function (item, value, node, options) {
                                var format = "<p id=\"{0}\">{1}</p>";
                                //node.innerHTML = lang.replace(format, ["txtLink" , item.link]);
                                node.innerHTML = lang.replace(format, ["pCreatedDate" + item.statusId, item.createdDate]);
                            }
                        },
                    }
                }, this.domNode);
            },

            _blockNodeCreator: function (item, hint) {
                //var self = this;
                //var node = domConstruct.create("div").appendChild(document.createTextNode(item.name));
                //return {
                //    "node": node,
                //    "type": self.dndTypes,
                //    "data": item
                //};
            },

         
            SaveData: function () {
                var temp = [];
                for (var i = 0; i < this.grid.store.data.length; i++) {
                    var answer = {
                        'StatusId': this.grid.store.data[i].statusId,
                        'Text': dojo.byId("pText" + this.grid.store.data[i].statusId).innerHTML,
                        'Link': dojo.byId("pLink" + this.grid.store.data[i].statusId).innerHTML,
                        'CreatedDate': dojo.byId("pCreatedDate" + this.grid.store.data[i].statusId).innerHTML,
                    };
                    temp.push(answer);
                }
                this.source = temp;
            },
            _getValueAttr:function() {
                var temp = [];
                for (var i = 0; i < this.grid.store.data.length; i++) {
                    var statusId = this.grid.store.data[i].statusId;
                    if (this.grid.selection[statusId]) {
                        var answer = {
                            'StatusId': statusId,
                            'Text': dojo.byId("pText" + statusId).innerHTML,
                            'Link': dojo.byId("pLink" + statusId).innerHTML,
                            'CreatedDate': dojo.byId("pCreatedDate" + statusId).innerHTML,
                        };
                        temp.push(answer);
                    }
                }
                return temp;
                //this.source = temp;
            },
            postCreate: function () {
                this.inherited(arguments);
            },
        });
    });