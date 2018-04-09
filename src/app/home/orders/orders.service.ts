import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../core/http.service';
import { OrderBase } from './order-base.model';
import { Order } from './order.model';


@Injectable()
export class OrderService {
    static END_POINT = '/orders';

    constructor(private httpService: HttpService) {
    }

    readAll(): Observable<OrderBase[]> {
        return this.httpService.authToken().get(OrderService.END_POINT);
    }

    readOne(orderId: string): any {
        return this.httpService.authToken().get(OrderService.END_POINT + `/${orderId}`);
    }

    create(order: Order): Observable<any> {
        return this.httpService.authToken().post(OrderService.END_POINT, order);
    }

    close(order: Order): Observable<any> {
        return this.httpService.authToken().put(OrderService.END_POINT + `/${order.id}`, order);
    }

}


