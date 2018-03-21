import {Component, Inject, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Shopping } from '../../shared/shopping.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html'
})
export class EditTicketDialogComponent implements OnInit {
  displayedColumns = ['numLineShopping', 'code', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
  listShopping: Shopping[] = [];
  dataSource: MatTableDataSource<Shopping>;
  dataSourceEdit: MatTableDataSource<Shopping>;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    let shopping0 = new Shopping('abc', 'vacio', 145);
    let shopping1 = new Shopping('def', 'vacio', 25);
    let shopping2 = new Shopping('ghi', 'vacio', 4465);
    let shopping3 = new Shopping('jkl', 'vacio', 5465);
    this.listShopping.push(shopping0);
    this.listShopping.push(shopping1);
    this.listShopping.push(shopping2);
    this.listShopping.push(shopping3);
    alert('id ' + this.data.ticket.id);
    alert('creationDate ' + this.data.ticket.creationDate);
    alert('cashDeposited ' + this.data.ticket.cashDeposited);
    alert('reference ' + this.data.ticket.reference);
    alert('shoppingList ' + this.data.ticket.shoppingList);
    alert('amount ' + this.data.ticket.shoppingList[0].amount);
    alert('code ' + this.data.ticket.shoppingList[0].code);
    alert('committed ' + this.data.ticket.shoppingList[0].committed);
    alert('description ' + this.data.ticket.shoppingList[0].description);
    alert('discount ' + this.data.ticket.shoppingList[0].discount);
    alert('retailPrice ' + this.data.ticket.shoppingList[0].retailPrice);
    alert('total ' + this.data.ticket.shoppingList[0].total);
    this.dataSourceEdit = new MatTableDataSource<Shopping>(this.data.ticket.shoppingList);
  }
  ngOnInit() {
  }
}
