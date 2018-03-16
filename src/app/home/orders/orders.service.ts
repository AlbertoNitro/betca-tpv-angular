import { Injectable } from "@angular/core";
import { order } from "../shared/order.model";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { orderBody } from "../shared/order-body.model";

@Injectable()
export class orderService{
    orders:  Subject<order[]> = new Subject();
    orderBody: Subject<orderBody[]> = new Subject();
    constructor() {
    }
    readAll(): Observable<order[]> {
        return this.orders.asObservable();
    }

    readBody(IdOrder:number) : Observable<orderBody[]>{        
        return this.orderBody.asObservable();
    }

}


