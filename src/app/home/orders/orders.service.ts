import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrderBase } from './order-base.model';
import { Order } from './order.model';
import { HttpService } from '../../core/http.service';

@Injectable()
export class OrderService {
    static END_POINT = '/orders';

    static CLOSING_DATE = '/closing-date';

    constructor(private httpService: HttpService) {
    }

    readAll(): Observable<OrderBase[]> {
        return this.httpService.authToken().get(OrderService.END_POINT);
    }

    readOne(orderId: string): any {
        return this.httpService.authToken().get(OrderService.END_POINT + `/${orderId}`);
    }

    delete(id: string): Observable<any> {
        return this.httpService.authToken().successful().delete(OrderService.END_POINT + `/${id}`);
    }

    create(order: Order): Observable<any> {
        return this.httpService.authToken().post(OrderService.END_POINT, order);
    }

    update(order: Order): Observable<any> {
        return this.httpService.authToken().successful().put(OrderService.END_POINT + `/${order.id}`, order);
    }

    close(order: Order): Observable<any> {
        return this.httpService.authToken().successful().post(OrderService.END_POINT + `/${order.id}` + OrderService.CLOSING_DATE, order);
    }

}


