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
    private allTickets: Subject<Ticket[]> = new Subject();

    constructor(private httpService: HttpService) {
    }
    private readTicketsCreationDatesBetween() {
      this.httpService.authToken().param('initialDate', '2017-01-01 00:00:00').param('finalDate', '2019-01-01 00:00:00')
        .get(TicketService.END_POINT + TicketService.SEARCH_BY_CREATION_DATES).subscribe(
        (ticketsArray: Ticket[]) => this.allTickets.next(ticketsArray),
        error => alert(error)
      );
    }
    getTicketsCreationDatesBetween(): Observable<Ticket[]> {
      this.readTicketsCreationDatesBetween();
      return this.allTickets.asObservable();
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

    readAllBetweenDates(id: string): Observable<TicketCreation[]> {
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
      return this.httpService.authToken().get(`${TicketService.END_POINT}/${id}`);
    }

}
