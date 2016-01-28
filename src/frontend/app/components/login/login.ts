import {Component, OnInit} from 'angular2/core';
import {SecurityService} from '../../services/securityService';
import {Router} from 'angular2/router';

@Component({
    selector: 'login',
    templateUrl: 'app/components/login/login.html'
})
export class LoginComponent implements OnInit {
    public userName: string;
    public password: string;
    public rememberMe: boolean;
    public errorOccurred: boolean;

    constructor(private security: SecurityService, private router: Router) {
    }

    ngOnInit(){
        if(this.security.isAuthenticated()){
            this.router.navigate(['List']);
        }
    }

    public submit() {
        this.errorOccurred = false;

        this.security.login(this.userName, this.password, this.rememberMe)
            .subscribe(() => this.router.navigate(['List']),
            () => this.errorOccurred = true);
    }

    public forgotPassword() {
        alert('Hint: User name and password must match.');
    }
}
