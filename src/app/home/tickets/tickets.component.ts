import {Component, ViewChild} from '@angular/core';
import {EditTicketDialogComponent} from './edit-ticket-dialog.component';
import {MatPaginator, MatDialog, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import {Ticket} from '../shared/ticket.model';
import {TicketService} from '../shared/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  static URL = 'tickets';
  listTickets: Ticket[] = [];
  initialDateInput: Date = undefined;
  finalDateInput: Date = undefined;
  dataSource: MatTableDataSource<Ticket>;
  displayedColumns = ['numTicket', 'id', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ticketService: TicketService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }
  showEditDialog(ticket: Ticket) {
    const dialogRef = this.dialog.open(EditTicketDialogComponent, {
      height: '500px',
      width: '800px',
      data: { ticket: ticket }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.findTicketsCreationDatesBetween();
          this.showTicket(ticket.id);
        }
      }
    );
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
    this.ticketService.readTicketsCreationDatesBetween(this.initialDateInput, this.finalDateInput).subscribe(
      (listTickets: Ticket[]) => {
        this.listTickets = listTickets;
        if (this.listTickets.length === 0) {
          this.snackBar.open('There aren\'t tickets between the selected dates !');
        } else {
          this.dataSource = new MatTableDataSource<Ticket>(this.listTickets);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    );
  }
}
