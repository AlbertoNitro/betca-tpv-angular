import { Component } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';

@Component({
    templateUrl: 'cashier-close-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashierCloseDialogComponent {
    cashierClosure: CashierClosure = { finalCash: 0, salesCard: 0, comment: '',
                                            totalCard: 0, totalCash: 0 };

    constructor(private cashierService: CashierService) {
        this.cashierClosure = this.cashierService.getCashierClosureInfo();
    }

    close() {
        this.cashierService.close(this.cashierClosure);
    }
}
