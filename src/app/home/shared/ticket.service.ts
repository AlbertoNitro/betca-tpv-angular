import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Shopping } from './shopping.model';
import { TicketCreation } from './ticket-creation.model';
import { URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class TicketService {
    static END_POINT = '/tickets';
    static SEARCH = '/search?';

    constructor(private httpService: HttpService) {
    }

    create(ticketCreation: TicketCreation): Observable<any> {
        return this.httpService.authToken().pdf().post(TicketService.END_POINT, ticketCreation);
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

}
