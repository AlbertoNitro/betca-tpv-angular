import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EditTicketDialogComponent} from './edit-ticket-dialog/edit-ticket-dialog.component';
import {MatPaginator, MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Ticket} from '../shared/ticket.model';
import {TicketService} from '../shared/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit, OnChanges {
  static URL = 'tickets';
  listTickets: Ticket[] = [];
  dataSource: MatTableDataSource<Ticket>;
  displayedColumns = ['numTicket', 'id', 'creationDate', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['listTickets']) {
      alert('hay cambios en listTickets');
      this.dataSource = new MatTableDataSource<Ticket>(this.listTickets);
      this.dataSource.paginator = this.paginator;
    }
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
  openPdf(blob: any) {
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  showTicket(id: string) {
    this.ticketService.read(id).subscribe(
      blob => this.openPdf(blob)
    );
  }

  findTicketsCreationDatesBetween() {
    alert("findTicketsCreationDatesBetween");
    /*
    this.ticketService.getTicketsCreationDatesBetween().subscribe(
      (listTickets: Ticket[]) => {
        alert('me subscribo al getTicketsCreationDatesBetween y me devuelve una lista de ticket');
        for (const ticket of listTickets) {
          alert('Ticket= [' + ' id:' + ticket.id + ' cashDeposited:' + ticket.cashDeposited + ' creationDate:' + ticket.creationDate + ' reference:' + ticket.reference + ' shoppingList:' + ticket.shoppingList + ']');
        }
      }
    );
    */
  }
}
