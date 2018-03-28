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
        this.invoiceService.readOne(invoiceId).subscribe(
            (invoice: Invoice) => this.data = new Array(1).fill(invoice)
        );
    }

    findByMobile(mobile: string) {
        this.invoiceService.findByMobile(mobile).subscribe(
            (listInvoices: Invoice[]) => this.data = listInvoices
        );
    }

    findInvoivesCreationDatesBetween() {
        this.invoiceService.findBetweenDates(this.initialDateInput, this.finalDateInput).subscribe(
            (listInvoices: Invoice[]) => this.data = listInvoices
        );
    }

    thisYearInvoices() {
        this.invoiceService.thisYearInvoices().subscribe(
            (listInvoices: Invoice[]) => this.data = listInvoices
        );
    }

    read(invoiceId: Invoice) {
        this.invoiceService.readOne(invoiceId.id).subscribe(
            (invoice: Invoice) => console.log(invoice.id + '::' + invoice.ticket.id + '::' + invoice.ticket.user.mobile)
        );
    }


}
