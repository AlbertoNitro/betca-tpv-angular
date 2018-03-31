import { Component, OnInit } from '@angular/core';
import { CashierClosure } from '../shared/cashier-closure.model';
import { CashierService } from '../shared/cashier.service';
import { MatDialog } from '@angular/material';
import { CashierMovementDialogComponent } from '../cashier-movements/cashier-movement-dialog.component';

@Component({
    templateUrl: 'cashier-close-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashierCloseDialogComponent {
    cashierClosure: CashierClosure = { totalVoucher: undefined, finalCash: undefined, salesCard: undefined };
    withdrawal: number;

    constructor(private dialog: MatDialog, private cashierService: CashierService) {
        this.cashierService.readTotals().subscribe(
            cashierClosure => this.cashierClosure = cashierClosure
        );
    }

    close() {
        this.cashierService.close(this.cashierClosure).subscribe(
            () => this.dialog.closeAll()
        );
    }

    invalid() {
        return (!this.cashierClosure.finalCash && this.cashierClosure.finalCash !== 0)
            || (!this.cashierClosure.salesCard && this.cashierClosure.salesCard !== 0)
            || !this.cashierClosure.comment;
    }

    cashMovement() {
        this.dialog.open(CashierMovementDialogComponent).afterClosed().subscribe(
            () => this.cashierService.readTotals().subscribe(
                cashierClosure => this.cashierClosure.totalCash = cashierClosure.totalCash
            )
        );
    }
}
