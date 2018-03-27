import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { InvoiceCreation } from './invoice-creation.model';
import { URLSearchParams, RequestOptions } from '@angular/http';

@Injectable()
export class InvoiceService {
    static END_POINT = '/invoices';

    constructor(private httpService: HttpService) {
    }

    create(invoiceCreation: InvoiceCreation): Observable<any> {
        return this.httpService.authToken().pdf().post(InvoiceService.END_POINT, invoiceCreation).map(
            blob => window.open(window.URL.createObjectURL(blob))
        );
    }

}
