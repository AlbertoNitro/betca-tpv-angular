import { Component, ViewChild } from '@angular/core';
import { EditTicketDialogComponent } from './edit-ticket-dialog.component';
import { MatPaginator, MatDialog, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  static URL = 'tickets';

  title = 'Tickets management';
  columns = ['id'];
  data: Ticket[];

  initialDateInput: Date = undefined;
  finalDateInput: Date = undefined;

  constructor(private dialog: MatDialog, private ticketService: TicketService) {
  }

  todayTickets() {
    this.ticketService.readToday().subscribe(
      (tickets: Ticket[]) => this.data = tickets
    );
  }

  findTicket(ticketId: string) {
    this.ticketService.readOne(ticketId).subscribe(
      (ticket: Ticket) => this.data = new Array(1).fill(ticket)
    );
  }

  findTicketsCreationDatesBetween() {
    this.ticketService.searchBetweenDates(this.initialDateInput, this.finalDateInput).subscribe(
      (listTickets: Ticket[]) => this.data = listTickets
    );
  }

  edit(ticketId: Ticket) {
    this.ticketService.readOne(ticketId.id).subscribe(
      ticket =>
        this.dialog.open(EditTicketDialogComponent, {
          width: '800px',
          data: { ticket: ticket }
        }).afterClosed().subscribe(
          result => {
            if (result) {
              this.read(ticket);
            }
          }
        )
    );
  }

  read(ticket: Ticket) {
    this.ticketService.readPdf(ticket.id).subscribe(
      blob => window.open(window.URL.createObjectURL(blob))
    );
  }


}
