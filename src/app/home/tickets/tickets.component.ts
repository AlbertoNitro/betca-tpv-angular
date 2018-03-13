import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Ticket} from '../shared/ticket.model';
import {EditTicketDialogComponent} from './edit-ticket-dialog/edit-ticket-dialog.component';
import {TicketService} from '../shared/ticket.service';
import {Shopping} from "../shared/shopping.model";
import {TicketCreation} from "../shared/ticket-creation.model";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  static URL = 'tickets';
  displayedColumns = ['numTicket', 'id', 'creationDate', 'actions'];
  listTickets: Ticket[] = [];
  dataSource: MatTableDataSource<Ticket>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  constructor(private ticketService: TicketService, public dialog: MatDialog) {
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

  showEditDialog() {
    this.dialog.open(EditTicketDialogComponent, {
      height: '500px',
      width: '900px',
    });
  }
  private generateShoppingMock(): Array<Shopping> {
    let listShopping = new Array<Shopping>();
    let shopping0 = new Shopping('abc', 'vacio', 45);
    let shopping1 = new Shopping('def', 'vacio', 25);
    let shopping2 = new Shopping('ghi', 'vacio', 5);
    let shopping3 = new Shopping('jkl', 'vacio', 65);
    listShopping.push(shopping0);
    listShopping.push(shopping1);
    listShopping.push(shopping2);
    listShopping.push(shopping3);
    return listShopping;
  }
  viewTicket() {
    let listShopping = this.generateShoppingMock();
    let ticketCreation: TicketCreation = {userMobile: 123, cash: 0, card: 0, voucher: 0, shoppingCart: listShopping};
    this.ticketService.create(ticketCreation).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
    );
  }
}
