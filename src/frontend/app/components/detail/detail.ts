import {Component, OnDestroy} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

import {Customer} from '../../models/customer';

import {CustomerService} from '../../services/customerService';
import Timer = NodeJS.Timer;

@Component({
    selector: 'detail',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/detail/detail.html'
})
export class DetailComponent implements OnDestroy {
    public customer: Customer;
    public message: string;
    public messageTimeout: Timer;

    constructor(
        private params: RouteParams,
        private router: Router,
        private customerService: CustomerService)
    {
        const customerId = params.get('id');

        if (customerId) {
            this.customerService.getCustomer(customerId)
                .subscribe(c => this.customer = c);
        } else {
            this.customer = new Customer();
        }
    }

    public onSubmitted(): void {
        let stream;

        if (this.customer.id) {
            stream = this.customerService.updateCustomer(this.customer);
        }
        else {
            stream = this.customerService.createCustomer(this.customer);
        }

        stream.subscribe(c => {
            this.customer = c;
            this.showMessage('Successfully saved.');
            this.router.navigate(['List']);
        }, () => this.showMessage('Could not save customer.'));
    }

    private showMessage(m: string): void {
        this.message = m;

        this.messageTimeout = setTimeout(() => {
            this.message = undefined;
            this.messageTimeout = undefined;
        }, 5000);
    }

    ngOnDestroy(): any {
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
    }
}
