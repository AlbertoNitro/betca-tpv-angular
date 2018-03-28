import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { EditTicketDialogComponent } from './edit-ticket-dialog.component';

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
  finalDateInput: Date = new Date();

  constructor(private dialog: MatDialog, private ticketService: TicketService) {
  }

  findTicket(ticketId: string) {
    this.ticketService.readOne(ticketId).subscribe(
      (ticket: Ticket) => this.data = new Array(1).fill(ticket)
    );
  }

  findByMobile(mobile: string) {
    this.ticketService.findByMobile(mobile).subscribe(
      (tickets: Ticket[]) => this.data = tickets
    );
  }

  findTicketsCreationDatesBetween() {
    this.ticketService.findBetweenDates(this.initialDateInput, this.finalDateInput).subscribe(
      (listTickets: Ticket[]) => this.data = listTickets
    );
  }

  todayTickets() {
    this.ticketService.readToday().subscribe(
      (tickets: Ticket[]) => this.data = tickets
    );
  }

  edit(ticketId: Ticket) {
    this.ticketService.readOne(ticketId.id).subscribe(
      ticket =>
        this.dialog.open(EditTicketDialogComponent, {
          width: '800px',
          data: { ticket: ticket }
        })
    );
  }

}
