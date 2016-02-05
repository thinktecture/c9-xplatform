import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../models/customer';
import {UrlService} from './urlService';
import {Headers, URLSearchParams} from 'angular2/http';
import {SecurityService} from './securityService';

@Injectable()
export class CustomerService {
    /**
     * API base URL
     */
    private baseUrl: string;

    constructor(public http: Http,
                public urlService: UrlService,
                public securityService: SecurityService) {
        this.baseUrl = urlService.getApiUrl();
    }

    /**
     * load all customers
     * @returns {Observable<Customer>} an observable with customers
     */
    public getCustomers(): Observable<Array<Customer>> {
        const endpoint = this.baseUrl + 'customers';
        const headers = this.createHeaders();

        return this.http.get(endpoint, {
                headers: headers
            })
            .map(r => r.json());
    }

    /**
     * load a customer by his/her id
     * @param {string} id
     * @returns {Observable<R>}
     */
    public getCustomer(id: string): Observable<Customer> {
        const endpoint = this.baseUrl + 'customer/' + id;
        const headers = this.createHeaders();

        return this.http.get(endpoint, {
                headers: headers
            })
            .map(r => r.json());
    }

    /**
     * store a new customer in backend
     * @param {Customer} customer new customer to store
     * @returns {Observable<Customer>}
     */
    public createCustomer(customer: Customer): Observable<Customer> {
        return this.createOrUpdateCustomer(customer);
    }

    /**
     * update an existing customer
     * @param {Customer} customer existing customer to update
     * @returns {Observable<Customer>}
     */
    public updateCustomer(customer: Customer): Observable<Customer> {
        return this.createOrUpdateCustomer(customer);
    }

    /**
     * delete a given customer
     * @param {Customer} customer customer to delete
     * @returns {Observable<R>}
     */
    public deleteCustomer(customer: Customer) {
        const headers = this.createHeaders();
        return this.http.delete(`${this.baseUrl}customer/${customer.id}`, {
            headers: headers
        })
            .map(res=> res.json());
    }

    /**
     * create or update a customer
     * @param {Customer} customer the customer instance
     * @returns {Observable<Customer>}
     */
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

    /**
     * create HTTP headers for authenticated calls
     * @returns {Headers}
     */
    private createHeaders(): Headers {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.securityService.accessToken}`);
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
