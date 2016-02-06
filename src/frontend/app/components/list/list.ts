import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Customer} from '../../models/customer';
import {CustomerService} from '../../services/customerService';

@Component({
    selector: 'list',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/list/list.html'
})
export class ListComponent {
    public records:Array<Customer>;

    constructor(private customerService:CustomerService) {
        this.customerService.getCustomers()
            .subscribe(res => {
                this.records = res;
            });
    }

    public deleteCustomer(customer:Customer) {
        this.customerService.deleteCustomer(customer)
            .subscribe(res=> {
                this.records = this.records.filter(function (c) {
                    return c.id !== customer.id
                });
            });
    }
}
