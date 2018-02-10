import { Component } from '@angular/core';
import { CashierClosure } from './cashier-closure.model';
import { CashierService } from '../cashier.service';

@Component({
    templateUrl: 'cashier-close-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashierCloseDialogComponent {
    cashierClosure: CashierClosure = { finalCash: 0, salesCard: 0, comment: '' };

    constructor(private cashierService: CashierService) {
    }

    close() {
        this.cashierService.close(this.cashierClosure);
    }
}
