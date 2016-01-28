import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../models/customer';
import {UrlService} from './urlService';
import {Headers, URLSearchParams} from 'angular2/http';
import {SecurityService} from './securityService';

@Injectable()
export class CustomerService {
    private baseUrl: string;

    constructor(public http: Http,
                public urlService: UrlService,
                public securityService: SecurityService) {
        this.baseUrl = urlService.getApiUrl();
    }

    public getCustomers(): Observable<Array<Customer>> {
        const endpoint = this.baseUrl + 'customers';
        const headers = this.createHeaders();

        return this.http.get(endpoint, {
                headers: headers
            })
            .map(r => r.json());
    }

    public getCustomer(id: string): Observable<Customer> {
        const endpoint = this.baseUrl + 'customer/' + id;
        const headers = this.createHeaders();

        return this.http.get(endpoint, {
                headers: headers
            })
            .map(r => r.json());
    }

    public createCustomer(customer: Customer): Observable<Customer> {
        return this.createOrUpdateCustomer(customer);
    }

    public updateCustomer(customer: Customer): Observable<Customer> {
        return this.createOrUpdateCustomer(customer);
    }

    public deleteCustomer(customer: Customer) {
        const headers = this.createHeaders();
        return this.http.delete(`${this.baseUrl}customer/${customer.id}`, {
            headers: headers
        })
            .map(res=> res.json());
    }

    private createOrUpdateCustomer(customer: Customer): Observable<Customer> {
        const endpoint = this.baseUrl + 'customer';
        const headers = this.createHeaders();

        // We assume, that a customer without an Id is a new one and needs to be created
        let httpEndpoint;

        if (customer.id) {
            httpEndpoint = this.http.put(endpoint, JSON.stringify(customer), {
                headers: headers
            });
        }
        else {
            httpEndpoint = this.http.post(endpoint, JSON.stringify(customer), {
                headers: headers
            });
        }

        return httpEndpoint.map(r => r.json());
    }

    private createHeaders(): Headers {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.securityService.accessToken}`);
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
