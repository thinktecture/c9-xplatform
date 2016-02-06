import {provide, Component, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, RouteDefinition, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app/app';
import {SecurityService} from './services/securityService';
import {UrlService} from './services/urlService';
import {CustomerService} from './services/customerService';
import {LocalStorageService} from './services/localStorageService';
import 'rxjs/Rx';

const APP_PROVIDERS = [SecurityService, UrlService, CustomerService, LocalStorageService];

enableProdMode();

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS,
    APP_PROVIDERS
]);
