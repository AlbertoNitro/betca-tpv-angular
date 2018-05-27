import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material';

import {VoucherConsumeDialogComponent} from '../cashier-opened/shopping-cart/voucher-consume-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styles: [`.payment-container {
        display: flex;
        flex-direction: column;
    }`]
})
export class PaymentComponent {

  _cash: number;
  _card: number;
  voucher: number;

  @Input() amountPayable = 0;

  @Output() paid = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {
    this._cash = 0;
    this._card = 0;
    this.voucher = 0;
  }

  private formatNumber(value: number): number {
    console.log('value...' + value);
    return ((value === undefined || value === null) ? 0 : value);
  }

  get cash() {
    return this._cash;
  }

  get card() {
    return this._card;
  }

  set cash(value: number) {
    this._cash = this.formatNumber(value);
    this.checkPaid();
  }

  set card(value: number) {
    this._card = this.formatNumber(value);
    this.checkPaid();
  }

  checkPaid() {
    if ((this._cash + this._card + this.voucher) >= this.amountPayable) {
      this.paid.emit(this._cash + this._card + this.voucher);
    }
  }

  fillCard() {
    this.card = this.amountPayable - this._cash - this.voucher;
  }

  fillCash() {
    this.cash = this.formatNumber(this.cash);
    if ((this._card + this.voucher) < this.amountPayable) {
      this.cash = this.amountPayable - this._card - this.voucher;
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
      result => {
        this.voucher += (result > 0 ? result : 0);
        this.checkPaid();
      }
    );
  }


}
