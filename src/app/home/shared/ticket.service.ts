import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Shopping } from './shopping.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService {
    static END_POINT = '/tickets';

    constructor(private httpService: HttpService) {
    }

    createObservable(shoppingCart: Shopping[]): Observable<boolean> {
        return this.httpService.authToken().post(TicketService.END_POINT, shoppingCart);
    }


}
