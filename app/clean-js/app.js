(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: 'my-app',
            template: '<h1>我的第一个 Angular 应用</h1>'
        })
            .Class({
                constructor: function () {
                }
            });
})(window.app || (window.app = {}));
/**
 * Created by junlanli on 12/12/16.
 */
(function (app) {
    app.AppModule =
        ng.core.NgModule({
            imports: [ng.platformBrowser.BrowserModule],
            declarations: [app.AppComponent],
            bootstrap: [app.AppComponent]
        })
            .Class({
                constructor: function () {
                }
            });
})(window.app || (window.app = {}));
/**
 * Created by junlanli on 12/12/16.
 */
(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platformBrowserDynamic
            .platformBrowserDynamic()
            .bootstrapModule(app.AppModule);
    });
})(window.app || (window.app = {}));