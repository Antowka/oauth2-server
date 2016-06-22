/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import 'zone.js/dist/zone';
import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';
import {Component,provide} from 'angular2/core';

import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {APP_BASE_HREF, LocationStrategy} from "angular2/src/platform/browser/location/location_strategy";
import {HashLocationStrategy} from "angular2/src/platform/browser/location/hash_location_strategy";

import {HttpAuthService} from "./services/HttpAuthService";
import {OAuthService} from './services/OAuthService';

import {SignUp} from "./components/auth/SignUp";
import {SignIn} from "./components/auth/SignIn";


@Component({
    selector:'oauth2-app',
    directives:[ROUTER_DIRECTIVES],
    templateUrl: 'dist/templates/main.html'
})
@RouteConfig([
    {path: 'signup', name: 'SignUp', component: SignUp},
    {path: 'signin', name: 'SignIn', component: SignIn}
])
export class Oauth2App{
    constructor() {}
}

bootstrap(Oauth2App, [
    HttpAuthService,
    OAuthService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass:HashLocationStrategy})
]);