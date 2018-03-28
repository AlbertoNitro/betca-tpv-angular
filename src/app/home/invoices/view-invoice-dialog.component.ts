import { Component, Inject } from '@angular/core';
import { Invoice } from '../shared/invoice.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TicketService } from '../shared/ticket.service';
import { EditTicketDialogComponent } from '../tickets/edit-ticket-dialog.component';

@Component({
    templateUrl: './view-invoice-dialog.component.html'
})
export class ViewInvoiceDialogComponent {

    invoice: Invoice;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private ticketService: TicketService) {
        this.invoice = data.invoice;
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
}
