import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {SecurityService} from '../../services/securityService';

@Component({
    selector: 'app-sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/sidebar/sidebar.html'
})
export class SidebarComponent {
    constructor(private securityService:SecurityService,
                private router:Router) {
    }
}
