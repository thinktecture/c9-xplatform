import {Component} from 'angular2/core';

import {SecurityService} from '../../services/securityService';

@Component({
    selector: 'app-header',
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent{
    constructor(
        private securityService: SecurityService
    ){

    }
}
