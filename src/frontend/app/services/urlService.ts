import {Injectable, Inject} from 'angular2/core';

@Injectable()
export class UrlService {
    private baseUrl:string = 'http://localhost:8090';

    /**
     * returns the API base Url
     * @returns {string}
     */
    public getApiUrl():string {
        return `${this.baseUrl}/api/`;
    };

    /**
     * returns the oAuth base Url
     * @returns {string}
     */
    public getOauthUrl():string {
        return `${this.baseUrl}/oauth/`;
    }
}
