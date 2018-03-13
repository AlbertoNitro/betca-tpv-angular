import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Shopping} from '../../shared/shopping.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html',
  styleUrls: ['./edit-ticket-dialog.component.css']
})
export class EditTicketDialogComponent implements OnInit, AfterViewInit {
  displayedColumns = ['numLineShopping', 'amount', 'discount', 'total', 'committed'];
  listShopping: Shopping[] = [];
  dataSource: MatTableDataSource<Shopping>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor() {
    //let shopping: Shopping = new Shopping('abc', 'vacio', 5455);
    this.dataSource = new MatTableDataSource<Shopping>(this.listShopping); }

  ngOnInit() {
  }

}
