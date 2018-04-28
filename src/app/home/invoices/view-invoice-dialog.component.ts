import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import {Invoice} from '../shared/invoice.model';

@Component({
  templateUrl: './view-invoice-dialog.component.html'
})
export class ViewInvoiceDialogComponent {

  invoice: Invoice;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.invoice = data.invoice;
  }
}
