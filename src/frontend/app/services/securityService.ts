import {Inject, Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {UrlService} from './urlService';
import {Subscription} from 'rxjs/Subscription';
import {LocalStorageService} from './localStorageService';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class SecurityService {
    private tokenStorageKey = 'token';
    private userStorageKey = "user";
    private isLoggedIn: boolean;
    private clientId: string = 'sample-client';
    private clientSecret: string = 'sample-client-secret';

    public accessToken: string;

    constructor(private router: Router,
                private http: Http,
                private urlService: UrlService,
                private localStorageService: LocalStorageService) {

        this.accessToken = localStorageService.get(this.tokenStorageKey);

        // For this demo we assume, that a loaded access token is valid and logs the user in
        this.isLoggedIn = !!this.accessToken;

        router.subscribe(url => {
            if (url !== '' && !this.isLoggedIn) {
                router.navigateByUrl('/');
            }
        });
    }

    public login(userName: string, password: string, rememberMe: boolean): Observable<void> {
        let oauthUrl = this.urlService.getOauthUrl();
        let tokenEndpointUrl = `${oauthUrl}token`;
        let content = `username=${userName}&password=${password}&client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=password`;
        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(tokenEndpointUrl, content, { headers: headers })
            .map(res => {
                let result = res.json();

                this.accessToken = result.access_token;
                this.isLoggedIn = true;
                this.localStorageService.set(this.userStorageKey, userName);
                if (rememberMe) {
                    this.localStorageService.set(this.tokenStorageKey, this.accessToken);
                }
            });
    }

    public isAuthenticated() {
        return this.isLoggedIn;
    }

    public getUserName(){
        return this.localStorageService.get(this.userStorageKey);
    }
    public logout() {
        this.isLoggedIn = false;
        this.localStorageService.remove(this.tokenStorageKey);
        this.router.navigateByUrl('/');
    }
}
