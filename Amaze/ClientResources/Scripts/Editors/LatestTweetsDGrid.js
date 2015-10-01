define("amaze/editors/LatestTweetsDGrid", [
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
        dojo, json, declare, domConstruct, lang, Memory, Stateful, on,
// Dijit
        _Widget, registry,
// DGrid
        OnDemandGrid, dgridSelection, Keyboard, editor,
// EPi Framework
        _WidgetCommandProviderMixin, Selection, _StatefulGetterSetterMixin, _ContextMixin
    ) {
        return declare("amaze/editors/LatestTweetsDGrid", [_Widget, _WidgetCommandProviderMixin, Stateful, _StatefulGetterSetterMixin, _ContextMixin], {
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
                        up: {
                            label: "",
                            className: "up",
                            renderCell: function (item, value, node, options) {
                                if (item.statusId != self.grid.store.data[0].statusId) {
                                    node.innerHTML = '<img src="../../../img/DownIcon.png">';
                                }
                            }
                        },
                        down: {
                            label: "",
                            className: "down",
                            renderCell: function (item, value, node, options) {
                                if (item.statusId != self.grid.store.data[self.grid.store.data.length - 1].statusId) {
                                    node.innerHTML = '<img src="../../../img/UpIcon.png">';
                                }
                            }
                        },
                        del: {
                            label: "",
                            className: "delete",
                            renderCell: function (item, value, node, options) {
                                node.innerHTML = '<img src="../../../img/DeleteIcon.png">';
                            }
                        },
                        tweetid: {
                            label: "Id",
                            className: "id",
                            //hidden:true,
                            renderCell: function (item, value, node, options) {
                                var format = "<p>{0}</p>";
                                //node.innerHTML = lang.replace(format, ["txtText", item.text]);
                                node.innerHTML = lang.replace(format, [item.statusId]);

                            }
                        },
                        text: {
                            label: "Description",
                            className: "Description",
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
                                node.innerHTML = lang.replace(format, ["pLink" + item.statusId, item.createdDate]);
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

            onDGridDeleting: function (sender) {
                this.SaveData();
                var temp = [];
                for (var i = 0; i < this.source.length; i++) {
                    if (this.source[i].statusId != sender.statusId) {
                        temp.push(this.source[i]);
                    }
                }
                this.source = temp;
                this._setSourceAttr(this.source);
                this.onChangeSource(json.toJson(this.source));
            },

            GetIndex: function (guid) {
                for (var i = 0; i < this.grid.store.data.length; i++) {
                    if (guid == this.grid.store.data[i].statusId) {
                        return i;
                    }
                }
                return -1;
            },

            SaveData: function () {
                //var temp = [];
                //for (var i = 0; i < this.grid.store.data.length; i++) {
                //    var tweet = {
                //        'StatusId': this.grid.store.data[i].statusId,
                //        'Text': dojo.byId("pText" + this.grid.store.data[i].statusId).innerHTML,
                //        'Link': dojo.byId("pLink" + this.grid.store.data[i].statusId).innerHTML,
                //    };
                //    temp.push(tweet);
                //}
                //this.source = temp;
            },
            onChangeSource: function (source) {

            },
            onDGridUping: function (sender) {
                this.SaveData();
                var index = this.GetIndex(sender.statusId);
                if (index != -1) {
                    var temp = this.source[index];
                    this.source[index] = this.source[index - 1];
                    this.source[index - 1] = temp;
                    this._setSourceAttr(this.source);
                    this.onChangeSource(json.toJson(this.source));
                }
            },

            onDGridDowning: function (sender) {
                this.SaveData();
                var index = this.GetIndex(sender.statusId);
                if (index != -1) {
                    var temp = this.source[index];
                    this.source[index] = this.source[index + 1];
                    this.source[index + 1] = temp;
                    this._setSourceAttr(this.source);
                    this.onChangeSource(json.toJson(this.source));
                }
            },

            postCreate: function () {
                this.inherited(arguments);
                this.grid.on("dgrid-sort", function (event) {
                    event.preventDefault();
                    return false;
                });
                this.grid.on('.down:click', lang.hitch(this, function (e) {
                    this.onDGridDowning(this.grid.row(e).data);
                }));

                this.grid.on('.delete:click', lang.hitch(this, function (e) {
                    this.onDGridDeleting(this.grid.row(e).data);
                }));

                this.grid.on('.up:click', lang.hitch(this, function (e) {
                    this.onDGridUping(this.grid.row(e).data);
                }));
            },
        });
    });