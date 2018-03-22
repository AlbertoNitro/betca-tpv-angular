import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { NumProductSold } from './numProductSold.model';
import { Observable } from 'rxjs/Observable';
import { Ticket } from './ticket.model';
import { TicketCreation } from './ticket-creation.model';
import { URLSearchParams, RequestOptions } from '@angular/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TicketService {
    static END_POINT = '/tickets';
    static SEARCH = '/search?';
    static SEARCH_BY_CREATION_DATES = '/searchByCreationDates?';

    constructor(private httpService: HttpService) {
    }
    private convertToString(date: Date): string {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    readTicketsCreationDatesBetween(initialDate: Date, finalDate: Date): Observable<Ticket[]> {
      return this.httpService.authToken().param('initialDate', `${this.convertToString(initialDate)} 00:00:00`)
        .param('finalDate', `${this.convertToString(finalDate)} 23:59:59`)
        .get(TicketService.END_POINT + TicketService.SEARCH_BY_CREATION_DATES);
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
        const cpParams = new URLSearchParams();
        cpParams.append('id', id);
        cpParams.append('dateStart', year + '-01-01 00:00:00');
        cpParams.append('dateFinish', year + '-12-31 11:59:59');
        const options = new RequestOptions({ params: cpParams });
        return this.httpService.authToken().get(TicketService.END_POINT + TicketService.SEARCH + options.search);
    }

    read(id: string): Observable<Ticket> {
      return this.httpService.authToken().pdf().get(`${TicketService.END_POINT}/${id}`);
    }

}
