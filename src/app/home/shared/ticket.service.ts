import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Shopping } from './shopping.model';
import { TicketCreation } from './ticket-creation.model';

@Injectable()
export class TicketService {
    static END_POINT = '/tickets';

    constructor(private httpService: HttpService) {
    }

    create(ticketCreation: TicketCreation): Observable<any> {
        return this.httpService.authToken().pdf().post(TicketService.END_POINT, ticketCreation);
    }


}
