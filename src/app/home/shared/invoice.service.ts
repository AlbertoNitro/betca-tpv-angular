import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { InvoiceCreation } from './invoice-creation.model';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { TicketCreation } from './ticket-creation.model';

@Injectable()
export class InvoiceService {
    static END_POINT = '/invoices';

    constructor(private httpService: HttpService) {
    }

    create(ticketCreation: TicketCreation): Observable<any> {
        return this.httpService.authToken().pdf().post(InvoiceService.END_POINT, ticketCreation);
    }

}
