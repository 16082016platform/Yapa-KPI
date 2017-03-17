'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./indicadores-view-model');

// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;
        // additional pageInit
    }
}
exports.pageLoaded = pageLoaded;

exports.buttonTap = function (args) {
    var chart = args.object;
    helpers.navigate({
        moduleName: 'components/indicadores/charts/' + chart.chart,
        animated: true,
        transition: {
            name: "slide"
        },
        context: chart.grafico,
    });
}