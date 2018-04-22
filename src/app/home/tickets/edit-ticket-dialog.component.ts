import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';

import { Shopping } from '../shared/shopping.model';
import { Ticket } from '../shared/ticket.model';
import { Invoice } from '../shared/invoice.model';
import { User } from '../shared/user.model';
import { TicketService } from '../shared/ticket.service';
import { VoucherService } from '../shared/voucher.service';
import { InvoiceService } from '../shared/invoice.service';
import { UserService } from '../shared/user.service';
import { PaymentDialogComponent } from './payment-dialog.component';
import { TicketCreation } from '../shared/ticket-creation.model';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: 'edit-ticket-dialog.component.html',
  styleUrls: ['edit-ticket-dialog.component.css']
})
export class EditTicketDialogComponent {
  debt: number;
  ticketId: string;
  ticketCreationDate: Date;
  invoiceId: string;
  ticketCreation: TicketCreation;

  displayedColumns = ['ind', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
  dataSource: MatTableDataSource<Shopping>;

  reserva: number = null;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private dialogRef: MatDialogRef<EditTicketDialogComponent>,
    private ticketService: TicketService, private voucheService: VoucherService, private invoiceService: InvoiceService,
    private userService: UserService) {

    this.ticketCreation = {
      userMobile: (data.ticket.user) ? data.ticket.user.mobile : null, card: 0, cash: 0, voucher: 0,
      note: data.ticket.note,
      shoppingCart: data.ticket.shoppingList
    };
    this.dataSource = new MatTableDataSource<Shopping>(this.ticketCreation.shoppingCart);
    this.debt = data.ticket.debt;
    this.ticketId = data.ticket.id;
    this.invoiceId = data.invoice;
    if (this.debt > 0) {
      this.reserva = this.totalNotCommited() - this.debt;
    }
  }

  private total(): number {
    let total = 0;
    this.ticketCreation.shoppingCart.forEach(element => total += element.total);
    return total;
  }

  private totalNotCommited(): number {
    let notCommitValue = 0;
    this.ticketCreation.shoppingCart.forEach(element => {
      if (!element.committed) {
        notCommitValue += element.total;
      }
    });
    return notCommitValue;
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
    this.debt -= totalOld - shopping.total;
  }

  changeCommitted(shopping: Shopping) {
    shopping.committed = !shopping.committed;
  }

  updateMobile(user: User) {
    if (user) {
      this.ticketCreation.userMobile = user.mobile;
    } else {
      this.ticketCreation.userMobile = null;
    }
  }

  acceptTicket() {
    if (this.debt < 0) {
      this.voucheService.create({ value: -this.debt }).subscribe(
        () => {
          this.ticketCreation.note += ' --> Devolución, generado vale: ' + (-this.debt);
          this.debt = 0;
          this.updateTicket();
        }
      );
    } else if (this.debt > 0) {
      let data: any;
      const advised = this.debt - (this.totalNotCommited() - this.reserva);
      if (advised >= this.debt) {
        data = { payable: this.debt, ticketCreation: this.ticketCreation };
      } else {
        data = {
          reserve: this.reserva,
          payable: advised,
          unpaid: this.totalNotCommited(),
          ticketCreation: this.ticketCreation
        };
      }
      this.dialog.open(PaymentDialogComponent, {
        data: data
      }).afterClosed().subscribe(
        ticketCreation => {
          if (ticketCreation) {
            this.ticketCreation = ticketCreation;
            this.updateTicket();
          }
        }
      );
    } else {
      this.updateTicket();
    }
  }


  updateTicket() {
    this.ticketService.updateTicket(this.ticketId, this.ticketCreation).subscribe(
      () => this.dialogRef.close()
    );
  }

}

