import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { TicketCreation } from './ticket-creation.model';
import { Invoice } from './invoice.model';
import { InvoiceCreation } from './invoice-creation.model';

@Injectable()
export class InvoiceService {
    static END_POINT = '/invoices';
    static SEARCH_DATE = '/search/date';
    static SEARCH_MOBILE = '/search/mobile';

    constructor(private httpService: HttpService) {
    }

    create(invoiceCreation: InvoiceCreation): Observable<any> {
        return this.httpService.authToken().pdf().post(InvoiceService.END_POINT, invoiceCreation);
    }

    readOne(id: String): Observable<Invoice> {
        return this.httpService.authToken().get(InvoiceService.END_POINT + '/' + id);
    }

    findByMobile(mobile: string): Observable<Invoice[]> {
        return this.httpService.authToken().param('mobile', mobile)
            .get(InvoiceService.END_POINT + InvoiceService.SEARCH_MOBILE);
    }

    findBetweenDates(start: Date, end: Date): Observable<Invoice[]> {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 0);
        return this.httpService.authToken().param('start', String(start.getTime()))
            .param('end', String(end.getTime())).get(InvoiceService.END_POINT + InvoiceService.SEARCH_DATE);
    }

    thisYearInvoices(): Observable<Invoice[]> {
        const start = new Date();
        start.setMonth(0);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        return this.findBetweenDates(start, new Date());
    }

}
