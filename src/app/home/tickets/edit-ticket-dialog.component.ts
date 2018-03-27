import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Shopping } from '../shared/shopping.model';
import { TicketService } from '../shared/ticket.service';
import { Ticket } from '../shared/ticket.model';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html',
  styleUrls: ['./edit-ticket-dialog.component.css']
})
export class EditTicketDialogComponent {

  displayedColumns = ['ind', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
  dataSource: MatTableDataSource<Shopping>;
  ticket: Ticket;

  totalReturn = 0;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private ticketService: TicketService,
  private dialogRef: MatDialogRef<EditTicketDialogComponent>) {
    this.dataSource = new MatTableDataSource<Shopping>(data.ticket.shoppingList);
    this.ticket = data.ticket;
  }

  decreaseAmount(shopping: Shopping) {
    const totalOld = this.updateTotal(shopping);
    shopping.amount -= 1;
    if (shopping.amount === 0) {
      shopping.committed = true;
    }
    this.totalReturn += totalOld - this.updateTotal(shopping);
  }

  changeCommitted(shopping: Shopping) {
    shopping.committed = !shopping.committed;
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }

  updateTotal(shopping: Shopping): number {
    return this.round(shopping.retailPrice * shopping.amount * (1 - shopping.discount / 100));
  }

  updateTicket() {
    this.dialogRef.close(true);
    // this.ticketService.updateAmountAndStateTicket(this.ticket);
    // generar pdf del nuevo ticket
    // generar vale de lo devuelto, si hay devolución
  }

}
