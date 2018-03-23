import {Component, Inject, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Shopping } from '../../shared/shopping.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html'
})
export class EditTicketDialogComponent implements OnInit {
  ticketId: string = this.data.ticket.id;
  displayedColumns = ['numLineShopping', 'description', 'retailPrice', 'amount', 'discount', 'committed'];
  listShopping: Shopping[] = [];
  dataSource: MatTableDataSource<Shopping>;
  dataSourceEdit: MatTableDataSource<Shopping>;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.dataSourceEdit = new MatTableDataSource<Shopping>(this.data.ticket.shoppingList);
  }
  ngOnInit() {
  }
}
