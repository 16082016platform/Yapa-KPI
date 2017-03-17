var utils = require("utils/utils");
var models = require("./view-model");
var frame = require("ui/frame");
var app = require("application");
// var navigator = require("../../common/navigator");
function rootGridLoaded(args) {
    var grid = args.object;
    if (grid.android) {
        var compat = android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}
exports.rootGridLoaded = rootGridLoaded;
function loadItem(page, item) {
    var dataModel = page.bindingContext;
    dataModel.loadGalleryFragment(item, page.getViewById("exampleHolder"), "~/components/indicadores/charts/bar", item.exampleXml);
    var cartesianChart = page.getViewById("chart");
    if (app.android) {
        cartesianChart.horizontalAxis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.MULTI_LINE);
    }
}
var dataModel = new models.ChartExamplesDataModel(true);
function pageNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = dataModel;

    var context = page.navigationContext;
    var itemToLoad = dataModel.barTypes[context];
    loadItem(page, itemToLoad);

     var dateObj = new Date();
    page.getViewById("nombreGrafico").text = "Solicitudes por tienda - " + ((parseInt(dateObj.getUTCMonth()) + 1) < 10 ? "0" + (parseInt(dateObj.getUTCMonth()) + 1) : (parseInt(dateObj.getUTCMonth()) + 1)) + "/" + dateObj.getUTCFullYear();
}
exports.pageNavigatingTo = pageNavigatingTo;
function pageNavigatingFrom(args) {
    var page = args.object;
    page.bindingContext.clearCache();
}
exports.pageNavigatingFrom = pageNavigatingFrom;
function scrollViewLoaded(args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}
exports.scrollViewLoaded = scrollViewLoaded;
function repeaterItemTap(args) {
    var item = args.view.bindingContext;
    var page = frame.topmost().currentPage;
    loadItem(page, item);
}
exports.repeaterItemTap = repeaterItemTap;
function goBack(args) {
    // navigator.navigateBackFromExample();
}
exports.goBack = goBack;