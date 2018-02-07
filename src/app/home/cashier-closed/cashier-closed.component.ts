import { Component } from '@angular/core';
import { CashierService } from '../cashier.service';
import { CashierLast } from './cashier-last.model';

@Component({
    templateUrl: `cashier-closed.component.html`
})
export class CashierClosedComponent {
    static URL = 'cashier-closed';

    cashierLastDate: Date;

    constructor(private cashierService: CashierService) {
        this.cashierService.lastObservable().subscribe(
            (date: CashierLast) => {
                this.cashierLastDate = date.closureDate;
            }
        );
    }

    open(): void {
        this.cashierService.open();
    }
}
