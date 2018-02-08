import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Shopping } from './shopping.model';

@Injectable()
export class TicketService {
    static END_POINT = '/tickets';

    constructor(private httpService: HttpService) {
    }

    createObservable(shoppingCart: Shopping[]): Observable<boolean> {
        return this.httpService.authToken().post(TicketService.END_POINT, shoppingCart);
    }


}
