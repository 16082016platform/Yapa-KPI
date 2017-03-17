'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "HomeView",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Indicadores",
    "moduleName": "components/indicadores/indicadores",
    "icon": "\ue0dd"
}, {
    "title": "Users",
    "moduleName": "components/users/users",
    "icon": "\ue0eb"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;