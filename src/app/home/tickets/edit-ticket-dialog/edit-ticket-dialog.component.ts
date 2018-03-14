import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Shopping } from '../../shared/shopping.model';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html'
})
export class EditTicketDialogComponent implements OnInit {
  displayedColumns = ['numLineShopping', 'code', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
  listShopping: Shopping[] = [];
  dataSource: MatTableDataSource<Shopping>;
  dataSourceEdit: MatTableDataSource<Shopping>;
  constructor() {
    let shopping0 = new Shopping('abc', 'vacio', 145);
    let shopping1 = new Shopping('def', 'vacio', 25);
    let shopping2 = new Shopping('ghi', 'vacio', 4465);
    let shopping3 = new Shopping('jkl', 'vacio', 5465);
    this.listShopping.push(shopping0);
    this.listShopping.push(shopping1);
    this.listShopping.push(shopping2);
    this.listShopping.push(shopping3);
    this.dataSource = new MatTableDataSource<Shopping>(this.listShopping);
    this.dataSourceEdit = new MatTableDataSource<Shopping>(this.listShopping);
  }
  ngOnInit() {
  }
}
