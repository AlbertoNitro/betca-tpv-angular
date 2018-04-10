import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { VoucherConsumeDialogComponent } from '../cashier-opened/shopping-cart/voucher-consume-dialog.component';

@Component({
    templateUrl: './payment-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class PaymentDialogComponent {
    total: number;
    minimum: number;

    cash: number;
    card: number;
    voucher: number;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<PaymentDialogComponent>,
        private dialog: MatDialog) {

        this.total = Math.round(data.debt * 100) / 100;
        this.minimum = Math.round(data.minimum * 100) / 100;
        this.cash = 0;
        this.card = 0;
        this.voucher = 0;
    }

    private format(value: number): number {
        return ((value === undefined || value === null) ? 0 : value);
    }

    fillCard() {
        if (this.card === this.total) {
            this.card = 0;
        } else {
            this.card = this.total;
        }
    }

    fillCash() {
        this.cash = this.format(this.cash);
        if (this.paid() < this.total) {
            this.cash = this.total - this.card - this.voucher;
        } else if (this.cash < 30) {
            this.cash = (Math.round(this.cash / 5) + 1) * 5;
        } else if (this.cash < 70) {
            this.cash = (Math.round(this.cash / 10) + 1) * 10;
        } else {
            this.cash = (Math.round(this.cash / 50) + 1) * 50;
        }
    }

    consumeVoucher() {
        const dialogRef = this.dialog.open(VoucherConsumeDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => this.voucher += (result > 0 ? result : 0)
        );
    }

    isValid(): boolean {
        return (this.paid() >= this.minimum);
    }

    returnCash(): number {
        return this.paid() - this.total;
    }

    paid(): number {
        return this.format(this.cash) + this.format(this.card) + this.voucher;
    }

    pay() {
        if (this.paid() > this.total) {
            this.dialogRef.close(this.total);
        } else {
            this.dialogRef.close(this.paid());
        }
    }

}
