import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

import {VoucherConsumeDialogComponent} from '../cashier-opened/shopping-cart/voucher-consume-dialog.component';
import {TicketCreation} from '../shared/ticket-creation.model';

@Component({
  templateUrl: 'payment-dialog.component.html',
  styleUrls: ['tickets.component.css']
})
export class PaymentDialogComponent {
  reserve: number;
  payable: number;
  unpaid: number;

  ticketCreation: TicketCreation;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<PaymentDialogComponent>,
              private dialog: MatDialog) {

    this.reserve = Math.round(data.reserve * 100) / 100;
    this.payable = Math.round(data.payable * 100) / 100;
    this.unpaid = Math.round(data.unpaid * 100) / 100;
    this.ticketCreation = data.ticketCreation;
  }

  private format(value: number): number {
    return ((value === undefined || value === null) ? 0 : value);
  }

  fillCard() {
    if (this.ticketCreation.card > 0) {
      this.ticketCreation.card = 0;
    } else {
      this.ticketCreation.card = this.payable;
    }
  }

  fillCash() {
    this.ticketCreation.cash = this.format(this.ticketCreation.cash);
    if (this.paid() < this.payable) {
      this.ticketCreation.cash = this.payable - this.ticketCreation.card - this.ticketCreation.voucher;
    } else if (this.ticketCreation.cash < 30) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
    } else if (this.ticketCreation.cash < 70) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
    } else {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
    }
  }

  consumeVoucher() {
    const dialogRef = this.dialog.open(VoucherConsumeDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => this.ticketCreation.voucher += (result > 0 ? result : 0)
    );
  }

  isValid(): boolean {
    return (this.paid() >= this.payable);
  }

  returnCash(): number {
    return this.paid() - this.payable;
  }

  private formatValues() {
    this.ticketCreation.cash = this.format(this.ticketCreation.cash);
    this.ticketCreation.card = this.format(this.ticketCreation.card);
    this.ticketCreation.voucher = this.format(this.ticketCreation.voucher);
  }

  paid(): number {
    return this.format(this.ticketCreation.cash) + this.format(this.ticketCreation.card) + this.ticketCreation.voucher;
  }

  pay() {
    const returned = this.returnCash();
    this.formatValues();
    if (returned > 0) {
      this.ticketCreation.cash -= returned;
    }
    this.ticketCreation.note += ' --> ';
    if (this.ticketCreation.card > 0) {
      this.ticketCreation.note += ' Abonado con Tarjeta: ' + Math.round(this.ticketCreation.card * 100) / 100 + '€.';
    }
    if (this.ticketCreation.voucher > 0) {
      this.ticketCreation.note += ' Abonado con vale: ' + Math.round(this.ticketCreation.voucher * 100) / 100 + '€.';
    }
    if (this.ticketCreation.cash > 0) {
      this.ticketCreation.note += ' Abonado en efectivo: ' + Math.round(this.ticketCreation.cash * 100) / 100 + '€.';
    }
    if (returned > 0) {
      this.ticketCreation.note += ' Devuelto: ' + returned + '€.';
    }
    this.dialogRef.close(this.ticketCreation);
  }

}
