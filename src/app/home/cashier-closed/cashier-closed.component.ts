import { Component } from '@angular/core';
import { CashierLast } from './cashier-last.model';

import { CashierService } from '../cashier.service';

@Component({
    templateUrl: `cashier-closed.component.html`
})
export class CashierClosedComponent {
    static URL = 'cashier-closed';

    cashierLastClosedDate: Date;

    constructor(private cashierService: CashierService) {
        this.cashierService.lastObservable().subscribe(
            (date: CashierLast) => {
                if (date !== undefined) {
                    this.cashierLastClosedDate = date.closureDate;
                }
            }
        );
    }

    open(): void {
        this.cashierService.open();
    }
}
