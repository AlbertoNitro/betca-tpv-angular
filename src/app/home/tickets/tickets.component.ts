import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EditTicketDialogComponent} from './edit-ticket-dialog/edit-ticket-dialog.component';
import {MatPaginator, MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Ticket} from '../shared/ticket.model';
import {TicketService} from '../shared/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  static URL = 'tickets';
  private listTickets: Ticket[] = [];
  dataSource: MatTableDataSource<Ticket>;
  displayedColumns = ['numTicket', 'id', 'creationDate', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  constructor(private ticketService: TicketService, public dialog: MatDialog) {
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
    this.ticketService.readTicketsCreationDatesBetween().subscribe(
      (listTickets: Ticket[]) => {
        this.listTickets = listTickets;
        this.dataSource = new MatTableDataSource<Ticket>(this.listTickets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}
