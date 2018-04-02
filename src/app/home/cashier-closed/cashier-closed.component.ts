import { Component } from '@angular/core';
import { CashierLast } from '../shared/cashier-last.model';

import { CashierService } from '../shared/cashier.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';
import { CashierOpenedComponent } from '../cashier-opened/cashier-opened/cashier-opened.component';

@Component({
    templateUrl: `cashier-closed.component.html`
})
export class CashierClosedComponent {
    static URL = 'cashier-closed';

    cashierLast: CashierLast = { closed: undefined };

    constructor(private router: Router, private cashierService: CashierService) {
        this.cashierService.last().subscribe(
            cashierLast => this.cashierLast = cashierLast
        );
    }

}
