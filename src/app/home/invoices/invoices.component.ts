import { Component } from '@angular/core';
import { Invoice } from '../shared/invoice.model';
import { MatDialog } from '@angular/material';
import { InvoiceService } from '../shared/invoice.service';

@Component({
    templateUrl: `invoices.component.html`
})
export class InvoicesComponent {
    static URL = 'invoices';

    title = 'Invoices management';
    columns = ['id'];
    data: Invoice[];

    initialDateInput: Date = undefined;
    finalDateInput: Date = new Date();

    constructor(private dialog: MatDialog, private invoiceService: InvoiceService) {
    }

    findInvoice(invoiceId: string) {
        //       this.ticketService.readOne(ticketId).subscribe(
        //          (ticket: Ticket) => this.data = new Array(1).fill(ticket)
        //       );
    }

    findByMobile(mobile: string) {
        // this.ticketService.findByMobile(mobile).subscribe(
        //  (tickets: Ticket[]) => this.data = tickets
        // );
    }

    findInvoivesCreationDatesBetween() {
    }

    thisYearInvoices() {
    }

    edit(invoiceId: Invoice) {
    }

    create() {

    }

}
