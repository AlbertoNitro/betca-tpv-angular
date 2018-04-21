import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TicketTracking } from '../tickets/ticket-tracking.model';
import { Ticket } from './ticket.model';
import { TicketCreation } from './ticket-creation.model';
import { NumProductSoldPerMonth } from './numProductSoldPerMonth.model';
import { NumProductSold } from './numProductSold.model';
import { IncomeComparasion } from './IncomeComparasion.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class TicketService {
  static END_POINT = '/tickets';
  static SEARCH_DATE = '/search/date';
  static SEARCH_MOBILE = '/search/mobile';
  static SEARCH_MOBILE_LAST = '/search/mobile/last';
  static SEARCH_ORDER_ID = '/search/order-id';
  static SEARCH_TICKETS_NOT_COMMITED = '/search/tickets-not-commited';
  static SEARCH_FAMILY_ID = '/search/family-id';

  static NUM_PRODUCTS_SOLD = '/numProductsSold';
  static HISTORICAL_PRODUCTS = '/historicalProducts';
  static COMPARISION_INCOME = '/comparisionIncome';

  static SEARCH_BY_ID_ARTICLE = '/searchByIdAndDates?';

  constructor(private httpService: HttpService) {
  }

  create(ticketCreation: TicketCreation): Observable<any> {
    return this.httpService.authToken().pdf().post(TicketService.END_POINT, ticketCreation);
  }

  readOne(id: string): Observable<Ticket> {
    return this.httpService.authToken().get(TicketService.END_POINT + '/' + id);
  }

  findBetweenDates(start: Date, end: Date): Observable<Ticket[]> {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);
    return this.httpService.authToken().param('start', String(start.getTime()))
      .param('end', String(end.getTime())).get(TicketService.END_POINT + TicketService.SEARCH_DATE);
  }

  findByMobile(mobile: string): Observable<Ticket[]> {
    return this.httpService.authToken().param('mobile', mobile)
      .get(TicketService.END_POINT + TicketService.SEARCH_MOBILE);
  }

  findLastByMobile(mobile: number): Observable<any> {
    return this.httpService.authToken().param('mobile', '' + mobile)
      .get(TicketService.END_POINT + TicketService.SEARCH_MOBILE_LAST);
  }

  readToday(): Observable<Ticket[]> {
    return this.findBetweenDates(new Date(), new Date());
  }

  updateTicket(ticket: Ticket): Observable<any> {
    return this.httpService.authToken().pdf().put(TicketService.END_POINT + '/' + ticket.id, ticket);
  }

  readNumProductSoldPerMonthsBetweenDates(dateStart: Date, dateEnd: Date): Observable<NumProductSoldPerMonth[]> {
    return this.httpService.authToken()
      .param('initDate', dateStart.toISOString())
      .param('endDate', dateEnd.toISOString())
      .get(TicketService.END_POINT + TicketService.HISTORICAL_PRODUCTS);
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

  readNumProductSoldBetweenDates(dateStart: Date, dateEnd: Date): Observable<NumProductSold[]> {
    return this.httpService.authToken()
      .param('initDate', dateStart.toISOString())
      .param('endDate', dateEnd.toISOString())
      .get(TicketService.END_POINT + TicketService.NUM_PRODUCTS_SOLD);
  }

  readComprisionIncome(dateStart: Date, dateEnd: Date): Observable<IncomeComparasion[]> {
    return this.httpService.authToken()
      .param('initDate', dateStart.toISOString())
      .param('endDate', dateEnd.toISOString())
      .get(TicketService.END_POINT + TicketService.COMPARISION_INCOME);
  }

  findByOrderId(orderId: string): Observable<TicketTracking[]> {
    return this.httpService.authToken().param('orderId', orderId).get(TicketService.END_POINT + TicketService.SEARCH_ORDER_ID);
  }

  findByAllTickets(): Observable<TicketTracking[]> {
    return this.httpService.authToken().get(TicketService.END_POINT + TicketService.SEARCH_TICKETS_NOT_COMMITED);

  }

  findByFamilyId(familyId: string): Observable<TicketTracking[]> {
    return this.httpService.authToken().param('familyId', familyId).get(TicketService.END_POINT + TicketService.SEARCH_FAMILY_ID);
  }

}
