import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Customer} from '../../models/customer';
import {CustomerService} from '../../services/customerService';
import Timer = NodeJS.Timer;

@Component({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/create/create.html'
})
export class CreateComponent {
    private customer:Customer;
    public message:string;
    public messageTimeout:Timer;

    constructor(private _router:Router, private _customerService:CustomerService) {
        this.customer = new Customer();
    }

    onSubmitted() {
        this._customerService.createCustomer(this.customer).subscribe(c => {
            this.customer = c;
            this._router.navigate(['List']);
        }, () => this.showMessage('Could not save customer.'));
    }

    private showMessage(m:string):void {
        this.message = m;

        this.messageTimeout = setTimeout(() => {
            this.message = undefined;
            this.messageTimeout = undefined;
        }, 5000);
    }

}
