import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { NumProductSold } from './numProductSold.model';
import { Observable } from 'rxjs/Observable';
import { Ticket } from './ticket.model';
import { TicketCreation } from './ticket-creation.model';
import { TicketUpdation } from './ticket-updation.model';

@Injectable()
export class TicketService {
  static END_POINT = '/tickets';

  static SEARCH_DATE = '/search/date';


  static SEARCH_BY_ID_ARTICLE = '/searchByIdAndDates?';
  static SEARCH_BY_CREATION_DATES = '/searchByCreationDates?';

  constructor(private httpService: HttpService) {
  }

  private convertToString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  readOne(id: string): Observable<Ticket> {
    return this.httpService.authToken().get(TicketService.END_POINT + '/' + id);
  }

  searchBetweenDates(start: Date, end: Date): Observable<Ticket[]> {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);
    return this.httpService.authToken().param('start', String(start.getTime()))
      .param('end', String(end.getTime())).get(TicketService.END_POINT + TicketService.SEARCH_DATE);
  }

  readToday(): Observable<Ticket[]> {
    return this.searchBetweenDates(new Date(), new Date());
  }

  readCreationDatesBetween(initialDate: Date, finalDate: Date): Observable<Ticket[]> {
    console.log('---' + initialDate.toTimeString());
    console.log('---' + initialDate.toDateString());
    console.log('---' + initialDate.getTime());
    return this.httpService.authToken().param('initialDate', `${this.convertToString(initialDate)} 00:00:00`)
      .param('finalDate', `${this.convertToString(finalDate)} 23:59:59`)
      .get(TicketService.END_POINT + TicketService.SEARCH_BY_CREATION_DATES);
  }




  updateAmountAndStateTicket(ticket: Ticket) {
    this.httpService.authToken().patch(`${TicketService.END_POINT}/${ticket.id}`, ticket).subscribe(
      () => true
    );
  }

  readPdf(id: string): Observable<Ticket> {
    return this.httpService.authToken().pdf().get(`${TicketService.END_POINT}/${id}`);

  }




  create(ticketCreation: TicketCreation): Observable<any> {
    return this.httpService.authToken().pdf().post(TicketService.END_POINT, ticketCreation);
  }

  readNumProductsBetweenDates(dateStart: Date, dateEnd: Date): Observable<NumProductSold[]> {
    const historicalProducts = '/historicalProducts';
    // return this.httpService.authToken().get(TicketService.END_POINT + historicalProducts );
    return this.httpService.authToken()
      .param('initDate', dateStart.toISOString())
      .param('endDate', dateEnd.toISOString())
      .get(TicketService.END_POINT + historicalProducts);
  }

  readIdArticleDatesBetween(id: string): Observable<TicketCreation[]> {
    const date = new Date();
    const year = date.getFullYear();
    return this.httpService.authToken()
      .param('id', id)
      .param('dateStart', year + '-01-01 00:00:00')
      .param('dateFinish', year + '-12-31 23:59:59')
      .get(TicketService.END_POINT + TicketService.SEARCH_BY_ID_ARTICLE);
  }
}
