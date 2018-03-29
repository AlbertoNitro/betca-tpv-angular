import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Shopping } from '../shared/shopping.model';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { VoucherService } from '../shared/voucher.service';
import { InvoiceService } from '../shared/invoice.service';
import { Invoice } from '../shared/invoice.model';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html',
  styleUrls: ['./edit-ticket-dialog.component.css']
})
export class EditTicketDialogComponent {

  displayedColumns = ['ind', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
  dataSource: MatTableDataSource<Shopping>;
  ticket: Ticket;
  invoice: Invoice;

  totalReturn = 0;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<EditTicketDialogComponent>,
    private ticketService: TicketService, private voucheService: VoucherService, private invoiceService: InvoiceService) {
    this.dataSource = new MatTableDataSource<Shopping>(data.ticket.shoppingList);
    this.ticket = data.ticket;
    this.invoice = data.invoice;
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }

  private updateTotal(shopping: Shopping): number {
    return this.round(shopping.retailPrice * shopping.amount * (1 - shopping.discount / 100));
  }

  decreaseAmount(shopping: Shopping) {
    const totalOld = shopping.total;
    shopping.amount -= 1;
    if (shopping.amount === 0) {
      shopping.committed = true;
    }
    shopping.total = this.updateTotal(shopping);
    this.totalReturn += totalOld - shopping.total;
  }

  changeCommitted(shopping: Shopping) {
    shopping.committed = !shopping.committed;
  }

  updateTicket() {
    this.ticketService.updateTicket(this.ticket).subscribe(
      () => {
        if (this.totalReturn > 0) {
          this.voucheService.create({ value: this.totalReturn }).subscribe(
            () => this.dialogRef.close()
          );
        } else {
          this.dialogRef.close();
        }
      }
    );
  }

  user() {
    if (this.ticket.user) {
      return this.ticket.user.mobile;
    }
  }

  invoiceId() {
    if (this.invoice) {
      return this.invoice.id;
    }
  }

}
