import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route} from 'angular2/router';
import {LoginComponent} from '../login/login';
import {ListComponent} from '../list/list';
import {DetailComponent} from '../detail/detail';
import {CreateComponent} from '../create/create';
import {HeaderComponent} from '../header/header';
import {SidebarComponent} from '../sidebar/sidebar';

import {SecurityService} from '../../services/securityService';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent],
    templateUrl: 'app/components/app/app.html'
})
@RouteConfig([
    new Route({path: '/', name: 'Login', component: LoginComponent, useAsDefault: true}),
    new Route({path: '/list', name: 'List', component: ListComponent}),
    new Route({path: '/detail/:id', name: 'Detail', component: DetailComponent}),
    new Route({path: '/create', name: 'Create', component: CreateComponent}),
])
export class AppComponent implements OnInit{


    constructor(
        private securityService: SecurityService
    ) { }

    ngOnInit(){

    }

    public logout() {
        this.securityService.logout();
    }
}
