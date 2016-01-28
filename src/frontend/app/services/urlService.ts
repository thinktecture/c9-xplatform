import {Injectable, Inject} from 'angular2/core';

@Injectable()
export class UrlService {
    private baseUrl: string = 'http://localhost:8090';

    public getApiUrl() : string {
        return `${this.baseUrl}/api/`;
    };

    public getOauthUrl() : string {
        return `${this.baseUrl}/oauth/`;
    }
}
