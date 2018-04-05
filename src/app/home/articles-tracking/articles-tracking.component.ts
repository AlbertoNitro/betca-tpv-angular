import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { InvoiceService } from '../shared/invoice.service';
import { ArticleTrackingService } from '../shared/articleTracking.service';

@Component({
  selector: 'app-articlestracking',
  templateUrl: './articles-tracking.component.html'
})
export class ArticlesTrackingComponent {
  static URL = 'articlestracking';

  title = 'Tickets management';
  columns = ['id', 'description', 'commited'];
  data: Ticket[];
  ticketValue = '';

  initialDateInput: Date = undefined;
  finalDateInput: Date = new Date();

  constructor(private dialog: MatDialog, private ticketService: TicketService, private invoiceService: InvoiceService,
    private articleTrackingService: ArticleTrackingService) {
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

  /*edit(ticketId: Ticket) {
    this.invoiceService.findByTicket(ticketId.id).subscribe(
      invoice => {
        if (invoice.id) {
          this.dialog.open(EditTicketDialogComponent, {
            width: '900px',
            data: { ticket: invoice.ticket, invoice: invoice }
          });
        } else {
          this.ticketService.readOne(ticketId.id).subscribe(
            ticket =>
              this.dialog.open(EditTicketDialogComponent, {
                width: '900px',
                data: { ticket: ticket, invoice: null }
              })
          );
        }
      }
    );
  }*/

  trackArticles(ticketId: string) {
    this.ticketValue = ticketId;
    console.log('Article tracking button clicked: ' + ticketId);

    this.articleTrackingService.readOne(ticketId).subscribe(
      (ticket: Ticket) => this.data = new Array(1).fill(ticket));
  }


}
