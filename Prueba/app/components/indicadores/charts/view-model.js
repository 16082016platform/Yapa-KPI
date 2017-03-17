'use strict';

var observable = require("data/observable");
var builder = require("ui/builder");
var app = require("application");
var utils = require("utils/utils");


var viewModel = require('../../users/users-view-model');


var ChartExamplesDataModel = (function () {
    function ChartExamplesDataModel(useCache) {
        this._useCache = useCache;
        this._views = {};
    }
    ChartExamplesDataModel.prototype.clearCache = function () {
        for (var i = 0; i < this._views.length; i++) {
            delete this._views[i];
        }
        this._views = {};
    };
    ChartExamplesDataModel.prototype.loadGalleryFragment = function (item, viewHolder, pathToModuleXML, exampleXmlName) {
        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
        }
        item.isSelected = true;
        this.selectedItem = item;
        var useCache = this._useCache && viewHolder.android !== undefined;
        var exampleView = useCache ? this._views[pathToModuleXML + exampleXmlName] : null;
        if (!exampleView) {
            exampleView = builder.load({
                path: pathToModuleXML,
                name: exampleXmlName
            });
            if (useCache) {
                this._views[pathToModuleXML + exampleXmlName] = exampleView;
            }
        }
        if (viewHolder.getChildrenCount() > 0) {
            var child = viewHolder.getChildAt(0);
            viewHolder.removeChild(child);
            child = null;
            if (viewHolder.ios) {
                utils.GC();
            }
        }
        viewHolder.addChild(exampleView);
    };
    Object.defineProperty(ChartExamplesDataModel.prototype, "categoricalSource", {
        get: function () {
            // if (this._categoricalSource) {
            //     return this._categoricalSource;
            // }
            // return this._categoricalSource = [
            //     { Category: "Jockey", Amount: 2.0 },
            //     { Category: "Marzano", Amount: 1.0 },
            //     { Category: "Miraflores", Amount: 3.0 },
            //     { Category: "Angamos", Amount: 4.0 }
            // ];
            if (this._categoricalSource) {
                return this._categoricalSource;
            }

            var items = viewModel.get("listItems");
            function compare(a, b) {
                if (a.details.tiendaExpand.nombre < b.details.tiendaExpand.nombre)
                    return -1;
                if (a.details.tiendaExpand.nombre > b.details.tiendaExpand.nombre)
                    return 1;
                return 0;
            }
            items.sort(compare);

            var datos = [];
            var a = [], b = [], prev;
            items.sort();
            for (var i = 0; i < items.length; i++) {
                if (items[i].details.tiendaExpand.nombre !== prev) {
                    a.push(items[i].details.tiendaExpand.nombre);
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = items[i].details.tiendaExpand.nombre;
            }

            for (var i = a.length - 1; i >= 0; i--) {
                var num = parseFloat(parseInt(b[i]));
                datos.push({ Category: a[i] + " (" + b[i] + ")", Amount: num });
            }

            return this._categoricalSource = datos;

        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "categoricalSource2", {
        get: function () {
            // if (this._categoricalSource2) {
            //     return this._categoricalSource2;
            // }
            // return this._categoricalSource2 = [
            //     { Category: "Mar", Amount: 5 },
            //     { Category: "Apr", Amount: 15 },
            //     { Category: "May", Amount: 3 },
            //     { Category: "Jun", Amount: 45 }
            // ];

            if (this._categoricalSource2) {
                return this._categoricalSource2;
            }

            var items = viewModel.get("listItems");
            function compare(a, b) {
                if (a.details.tiendaExpand.nombre < b.details.tiendaExpand.nombre)
                    return -1;
                if (a.details.tiendaExpand.nombre > b.details.tiendaExpand.nombre)
                    return 1;
                return 0;
            }
            items.sort(compare);

            var datos = [];
            var a = [], b = [], c = [], prev;
            items.sort();
            for (var i = 0; i < items.length; i++) {
                if (items[i].details.tiendaExpand.nombre !== prev) {
                    a.push(items[i].details.tiendaExpand.nombre);
                    b.push(1);
                    if (items[i].details.estado) {
                        c.push(1);
                    } else {
                        c.push(0);
                    }
                } else {
                    b[b.length - 1]++;
                    if (items[i].details.estado) {
                        c[c.length - 1]++;
                    }
                }
                prev = items[i].details.tiendaExpand.nombre;
            }

            for (var i = a.length - 1; i >= 0; i--) {
                var num = parseFloat(parseInt(b[i]) - parseInt(c[i]));
                datos.push({ Category: a[i] + " (" + b[i] + ")", Amount: num });
            }

            return this._categoricalSource2 = datos;

        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "categoricalSource3", {
        get: function () {
            // if (this._categoricalSource3) {
            //     return this._categoricalSource3;
            // }
            // return this._categoricalSource3 = [
            //     { Category: "Mar", Amount: 65 },
            //     { Category: "Apr", Amount: 56 },
            //     { Category: "May", Amount: 89 },
            //     { Category: "Jun", Amount: 68 }
            // ];

            if (this._categoricalSource3) {
                return this._categoricalSource3;
            }

            var items = viewModel.get("listItems");
            function compare(a, b) {
                if (a.details.tiendaExpand.nombre < b.details.tiendaExpand.nombre)
                    return -1;
                if (a.details.tiendaExpand.nombre > b.details.tiendaExpand.nombre)
                    return 1;
                return 0;
            }
            items.sort(compare);

            var datos = [];
            var a = [], b = [], c = [], prev;
            items.sort();
            for (var i = 0; i < items.length; i++) {
                if (items[i].details.tiendaExpand.nombre !== prev) {
                    a.push(items[i].details.tiendaExpand.nombre);
                    b.push(1);
                    if (items[i].details.estado) {
                        c.push(1);
                    } else {
                        c.push(0);
                    }
                } else {
                    b[b.length - 1]++;
                    if (items[i].details.estado) {
                        c[c.length - 1]++;
                    }
                }
                prev = items[i].details.tiendaExpand.nombre;
            }

            for (var i = a.length - 1; i >= 0; i--) {
                var num = parseFloat(parseInt(c[i]));
                datos.push({ Category: a[i] + " (" + b[i] + ")", Amount: num });
            }

            return this._categoricalSource3 = datos;

        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "areaSource", {
        get: function () {
            // if (this._areaSource) {
            //     return this._areaSource;
            // }
            // return this._areaSource = [
            //     { Category: "9", Amount: 0 },
            //     { Category: "10", Amount: 5 },
            //     { Category: "11", Amount: 20 },
            //     { Category: "12", Amount: 10 },
            //     { Category: "13", Amount: 50 },
            //     { Category: "14", Amount: 40 },
            //     { Category: "15", Amount: 30 },
            //     { Category: "16", Amount: 20 },
            //     { Category: "17", Amount: 15 },
            //     { Category: "18", Amount: 40 },
            //     { Category: "19", Amount: 50 },
            //     { Category: "20", Amount: 60 },
            //     { Category: "21", Amount: 65 },
            //     { Category: "22", Amount: 30 }
            // ];

            if (this._areaSource) {
                return this._areaSource;
            }

            var items = viewModel.get("listItems");
            function compare(a, b) {
                if (a.details.CreatedAt < b.details.CreatedAt)
                    return -1;
                if (a.details.CreatedAt > b.details.CreatedAt)
                    return 1;
                return 0;
            }
            items.sort(compare);

            var datos = [];
            var a = [], b = [], prev;
            items.sort();

            var weekday = new Array(7);
            weekday[0] = "Lun";
            weekday[1] = "Mar";
            weekday[2] = "Mié";
            weekday[3] = "Jue";
            weekday[4] = "Vie";
            weekday[5] = "Sáb";
            weekday[6] = "Dom";

            for (var i = 0; i < items.length; i++) {
                var d = new Date(items[i].details.CreatedAt);

                if (weekday[d.getDay()] !== prev) {
                    a.push(weekday[d.getDay()]);
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = weekday[d.getDay()];
            }

            for (var i = a.length - 1; i >= 0; i--) {
                var num = parseFloat(parseInt(b[i]));
                datos.push({ Category: a[i] + " (" + b[i] + ")", Amount: num });
            }

            return this._areaSource = datos;


        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "areaSource2", {
        get: function () {
            if (this._areaSource2) {
                return this._areaSource2;
            }
            return this._areaSource2 = [
                { Category: "Mar", Amount: 60 },
                { Category: "Apr", Amount: 87 },
                { Category: "May", Amount: 91 },
                { Category: "Jun", Amount: 95 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "bubbleCategoricalSource", {
        get: function () {
            if (this._bubbleCategoricalSource) {
                return this._bubbleCategoricalSource;
            }
            return this._bubbleCategoricalSource = [
                { Country: "Germany", Amount: Math.random() * 10, Impact: 1 },
                { Country: "France", Amount: Math.random() * 10, Impact: 7 },
                { Country: "Bulgaria", Amount: Math.random() * 10, Impact: 10 },
                { Country: "Spain", Amount: Math.random() * 10, Impact: 3 },
                { Country: "USA", Amount: Math.random() * 10, Impact: 4 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "pieSource", {
        get: function () {
            if (this._pieSource) {
                return this._pieSource;
            }
            return this._pieSource = [
                { Country: "Hombres", Amount: 20.0 },
                { Country: "Niños", Amount: 50.0 },
                { Country: "Mujeres", Amount: 30.0 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "pieSource2", {
        get: function () {
            if (this._pieSource2) {
                return this._pieSource2;
            }
            var items = viewModel.get("listItems");

            function compare(a, b) {
                if (a.details.credito < b.details.credito)
                    return -1;
                if (a.details.credito > b.details.credito)
                    return 1;
                return 0;
            }
            items.sort(compare);

            var datos = [];
            var a = [], b = [], prev;

            for (var i = 0; i < items.length; i++) {
                if (items[i].details.credito !== prev) {
                    a.push(items[i].details.credito);
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = items[i].details.credito;
            }

            for (var i = 0; i < a.length; i++) {
                var num = parseFloat(parseInt(b[i])).toFixed(1);
                datos.push({ Company: a[i] + " (" + b[i] + ")", Amount: num });
            }

            return this._pieSource2 = datos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "pieSource3", {
        get: function () {
            if (this._pieSource3) {
                return this._pieSource3;
            }
            return this._pieSource3 = [
                { Level: "Google", Amount: 20.0 },
                { Level: "Apple", Amount: 30.0 },
                { Level: "Microsoft", Amount: 10.0 },
                { Level: "Oracle", Amount: 8.0 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    ChartExamplesDataModel.prototype.getPictureResourcePath = function (groupName, exampleName) {
        // if (app.ios) {
        //     return "res://chart/" + groupName + "/" + exampleName;
        // }
        // var resourcePath = "res://" + exampleName;
        // return resourcePath;
        if (app.ios) {
            return "~/images/chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "~/images/chart/" + exampleName;
        return resourcePath;
    };
    Object.defineProperty(ChartExamplesDataModel.prototype, "areaTypes", {
        get: function () {
            if (this._areaTypes) {
                return this._areaTypes;
            }
            return this._areaTypes = [
                new ChartTypeItem(true, this.getPictureResourcePath("area", "area1"), "area1"),
                new ChartTypeItem(false, this.getPictureResourcePath("area", "area2"), "area2"),
                new ChartTypeItem(false, this.getPictureResourcePath("area", "area3"), "area3"),
                new ChartTypeItem(false, this.getPictureResourcePath("area", "area4"), "area4"),
                new ChartTypeItem(false, this.getPictureResourcePath("area", "area5"), "area5"),
                new ChartTypeItem(false, this.getPictureResourcePath("area", "area6"), "area6")
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "barTypes", {
        get: function () {
            if (this._barTypes) {
                return this._barTypes;
            }
            return this._barTypes = [
                new ChartTypeItem(true, this.getPictureResourcePath("bar", "bar1"), "bar1"),
                new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar2"), "bar2"),
                new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar3"), "bar3"),
                new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar4"), "bar4"),
                new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar5"), "bar5"),
                new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar6"), "bar6")
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "lineTypes", {
        get: function () {
            if (this._lineTypes) {
                return this._lineTypes;
            }
            return this._lineTypes = [
                new ChartTypeItem(true, this.getPictureResourcePath("line", "line1"), "line1"),
                new ChartTypeItem(false, this.getPictureResourcePath("line", "line2"), "line2"),
                new ChartTypeItem(false, this.getPictureResourcePath("line", "line3"), "line3"),
                new ChartTypeItem(false, this.getPictureResourcePath("line", "line4"), "line4")
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartExamplesDataModel.prototype, "pieTypes", {
        get: function () {
            if (this._pieTypes) {
                return this._pieTypes;
            }
            return this._pieTypes = [
                new ChartTypeItem(true, this.getPictureResourcePath("pie", "pie1"), "pie1"),
                new ChartTypeItem(false, this.getPictureResourcePath("pie", "pie2"), "pie2"),
                new ChartTypeItem(false, this.getPictureResourcePath("pie", "pie3"), "pie3"),
            ];
        },
        enumerable: true,
        configurable: true
    });
    return ChartExamplesDataModel;
} ());
exports.ChartExamplesDataModel = ChartExamplesDataModel;


var ChartTypeItem = (function (_super) {
    __extends(ChartTypeItem, _super);
    function ChartTypeItem(selected, imageResource, xmlResource) {
        _super.call(this);
        this.isSelected = selected;
        this.imageRes = imageResource;
        this.exampleXml = xmlResource;
    }
    Object.defineProperty(ChartTypeItem.prototype, "isSelected", {
        get: function () {
            return this.get("selected");
        },
        set: function (value) {
            this.set("selected", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTypeItem.prototype, "imageRes", {
        get: function () {
            return this.get("imgRes");
        },
        set: function (value) {
            this.set("imgRes", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTypeItem.prototype, "selectedImageRes", {
        get: function () {
            var suffix = app.ios ? "s" : "";
            return this.get("imgRes") + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTypeItem.prototype, "exampleXml", {
        get: function () {
            return this.get("exXml");
        },
        set: function (value) {
            this.set("exXml", value);
        },
        enumerable: true,
        configurable: true
    });
    return ChartTypeItem;
} (observable.Observable));
exports.ChartTypeItem = ChartTypeItem;

