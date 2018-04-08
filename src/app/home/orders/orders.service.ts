import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../core/http.service';
import { OrderBase } from './order.model';


@Injectable()
export class OrderService {
    static END_POINT = '/orders';

    constructor(private httpService: HttpService) {
    }

    readAll(): Observable<OrderBase[]> {
        return this.httpService.authToken().get(OrderService.END_POINT);
    }

}


