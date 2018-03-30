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

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
        this.invoice = data.invoice;
    }
}
