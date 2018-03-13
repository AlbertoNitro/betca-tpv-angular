import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Ticket} from '../shared/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  static URL = 'tickets';
  initialDate: Date;
  displayedColumns = ['ticketIcon', 'id', 'creationDate', 'actions'];
  listTickets: Ticket[] = [];
  dataSource: MatTableDataSource<Ticket>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  constructor() {
    this.listTickets.push({id: '667729965', creationDate: new Date(), reference: '0', cashDeposited: 0.0, shoppingList: null});
    this.listTickets.push({id: '655129465', creationDate: new Date(), reference: '10', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '661449265', creationDate: new Date(), reference: '20', cashDeposited: 5.0, shoppingList: null });
    this.listTickets.push({id: '666129115', creationDate: new Date(), reference: '9999', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '666669215', creationDate: new Date(), reference: '0', cashDeposited: 10.0, shoppingList: null });
    this.listTickets.push({id: '667729965', creationDate: new Date(), reference: '0', cashDeposited: 0.0, shoppingList: null});
    this.listTickets.push({id: '655129465', creationDate: new Date(), reference: '10', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '661449265', creationDate: new Date(), reference: '20', cashDeposited: 5.0, shoppingList: null });
    this.listTickets.push({id: '666129115', creationDate: new Date(), reference: '0', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '666669215', creationDate: new Date(), reference: '55', cashDeposited: 10.0, shoppingList: null });
    this.listTickets.push({id: '667729965', creationDate: new Date(), reference: '0', cashDeposited: 0.0, shoppingList: null});
    this.listTickets.push({id: '655129465', creationDate: new Date(), reference: '10', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '661449265', creationDate: new Date(), reference: '20', cashDeposited: 5.0, shoppingList: null });
    this.listTickets.push({id: '666129115', creationDate: new Date(), reference: '0', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '666669215', creationDate: new Date(), reference: '70', cashDeposited: 10.0, shoppingList: null });
    this.listTickets.push({id: '667729965', creationDate: new Date(), reference: '0', cashDeposited: 0.0, shoppingList: null});
    this.listTickets.push({id: '655129465', creationDate: new Date(), reference: '10', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '661449265', creationDate: new Date(), reference: '90', cashDeposited: 5.0, shoppingList: null });
    this.listTickets.push({id: '666129115', creationDate: new Date(), reference: '9999', cashDeposited: 0.0, shoppingList: null });
    this.listTickets.push({id: '666669215', creationDate: new Date(), reference: '0', cashDeposited: 10.0, shoppingList: null });
    this.dataSource = new MatTableDataSource<Ticket>(this.listTickets);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
