import { Component, OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: 'cashier-close-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashierCloseDialogComponent {
    cashierClosure: CashierClosure = { totalVoucher: undefined, finalCash: undefined, salesCard: undefined };

    constructor(private dialog: MatDialog, private cashierService: CashierService) {
        this.cashierService.readTotals().subscribe(
            cashierClosure => {
                this.cashierClosure = cashierClosure;
            }
        );
    }

    close() {
        this.cashierService.close(this.cashierClosure).subscribe(
            () => this.dialog.closeAll()
        );
    }
    invalid() {
        return (!this.cashierClosure.finalCash && this.cashierClosure.finalCash !== 0)
            || (!this.cashierClosure.salesCard && this.cashierClosure.salesCard !== 0);
    }
}
