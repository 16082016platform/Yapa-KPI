'use strict';
var frameModule = require("ui/frame");
var imageModule = require("ui/image");

function pageLoaded(args) {
    _fetchData();
    // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    } else {
        frameModule.topmost().android.navBarVisibility = "never";
    }
    var item = new imageModule.Image();

    item.src = "~/images/bg1.png";
    item.height = 150;
    item.on("loaded", function (args) {
        args.object
            // Shrink the logo over 1.5 seconds
            .animate({
                scale: { x: 0.6, y: 0.6 },
                duration: 1000
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 4, y: 4 },
                    duration: 1000,
                    // rotate: 360
                });
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 0.6, y: 0.6 },
                    duration: 2000
                });
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 0.6, y: 0.6 },
                    duration: 200
                });
            })
            .then(function () {
                // Fade out the logo
                return args.object.animate({
                    opacity: 0,
                    duration: 1000
                });
            })
            .then(function () {
                // Navigate to the starting page. In the case of Groceries.
                // this is the login page
                frameModule.topmost().navigate({
                    moduleName: "components/homeView/homeView",
                    animated: false,
                    clearHistory: true,
                });
            });
    });

    var page = args.object;

    // Append the dynamically created image to the <GridLayout>
    var gridSplashScreen = page.getViewById("gridSplashScreen");
    gridSplashScreen.addChild(item);

}
exports.pageLoaded = pageLoaded;





var service = require('~/components/users/users-service'),
    viewModel = require('~/components/users/users-view-model');
function _fetchData() {
    return service.getAllRecords();
};

_fetchData()
    .then(function (result) {
        var itemsList = [];
        result.forEach(function (item) {
            itemsList.push({
                details: item
            });
        });
        viewModel.set('listItems', itemsList);
        viewModel.set('isLoading', false);
    })
    .catch(function onCatch() {
        viewModel.set('isLoading', false);
    });
