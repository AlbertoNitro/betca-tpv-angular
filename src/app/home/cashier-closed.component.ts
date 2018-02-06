import { Component } from '@angular/core';
import { CashierService } from './cashier.service';
import { LastCashier } from './last-cashier.model';

@Component({
    templateUrl: `cashier-closed.component.html`
})
export class CashierClosedComponent {
    static URL = 'cashier-closed';

    cashierLastDate: Date;

    constructor(private cashierService: CashierService) {
        this.cashierService.getCashierLast().subscribe(
            (date: LastCashier) => {
                this.cashierLastDate = date.closureDate;
            }
        );
    }

    open(): void {
        this.cashierService.open();
    }
}
