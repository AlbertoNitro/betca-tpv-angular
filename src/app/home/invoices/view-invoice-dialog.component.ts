import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Invoice } from '../shared/invoice.model';
import { TicketService } from '../shared/ticket.service';
import { EditTicketDialogComponent } from '../tickets/edit-ticket-dialog.component';

@Component({
    templateUrl: './view-invoice-dialog.component.html'
})
export class ViewInvoiceDialogComponent {

    invoice: Invoice;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private ticketService: TicketService) {
        this.invoice = data.invoice;
        // DELETE... only in develop
        if (!this.invoice.user) {
            this.invoice.user = { mobile: 0, username: null };
        }
    }

    editTicket() {
        this.ticketService.readOne(this.invoice.ticket.id).subscribe(
            ticket =>
                this.dialog.open(EditTicketDialogComponent, {
                    width: '800px',
                    data: { ticket: ticket }
                })
        );
    }

    editUser() {
    }
}
