/**
 * Включаем в сборку файл стилей
 */
require('./../css/style.scss');

/**
 * Библиотеки
 */
// require('bootstrap/dist/js/bootstrap.min');
//require('jquery.scrollto');


/**
 * Либа для инициализации модулей https://www.npmjs.com/package/module-dispatcher
 * Вызывает метод init() у модулей на указанных страницах
 */
const ModuleDispatcher = require('module-dispatcher');
const app = (function (app_) {

    'use strict';

    app_.init = function () {

        app.docReady(function () {
            /**
             * Инициализация модуль-диспетчера с библиотекой, указанной в output.library
             */
            new ModuleDispatcher({
                Library : app
            });

        });

    };

    return app_;

})({});


/**
 * Проверяем, что DOM загрузился: http://dustindiaz.com/smallest-domready-ever
 */
app.docReady = function (f) {
    return /in/.test(document.readyState) ? window.setTimeout(app.docReady, 9, f) : f();
};


/**
 *  модули
 */
app.langMenu= require('./partials/lang-menu');
app.mobileMenu= require('./partials/mobile-menu');



/**
 * Инициализация нужных модулей
 */
module.exports = app;

app.langMenu.init();
app.mobileMenu.init();
