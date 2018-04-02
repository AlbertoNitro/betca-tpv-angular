import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { User } from '../shared/user.model';
import { TicketService } from '../shared/ticket.service';
import { InvoiceService } from '../shared/invoice.service';

@Component({
    templateUrl: './invoice-creation-dialog.component.html',
    styles: [`
    .mat-cell {
        overflow: visible;
      }
      .mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class InvoiceCreationDialogComponent {

    user: User;
    ticketId: string;
    ticketIdSynchronized = false;

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private ticketService: TicketService,
        private invoiceService: InvoiceService) {
    }

    updateUser(user: User) {
        this.user = user;
    }

    findTicket() {
        this.invoiceService.findByTicket(this.ticketId).subscribe(
            invoice => {
                if (!invoice.id) {
                    this.ticketService.readOne(this.ticketId).subscribe(
                        ticket => {
                            this.ticketId = ticket.id;
                            this.ticketIdSynchronized = true;
                        }
                    );
                } else {
                    this.snackBar.open('Ticket already has an invoice', 'Error', {
                        duration: 8000
                    });
                }
            }
        );
    }

    deleteTicket() {
        this.ticketId = undefined;
        this.ticketIdSynchronized = false;
    }

    invalidInvoice() {
        return !this.ticketIdSynchronized || this.user && (!this.user.dni || !this.user.address);
    }

    createInvoice() {
        this.invoiceService.create({ mobile: this.user.mobile, ticketId: this.ticketId }).subscribe(
            () => this.dialog.closeAll()
        );
    }

}
