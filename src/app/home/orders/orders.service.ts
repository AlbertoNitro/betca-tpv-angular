import { Injectable } from "@angular/core";
import { order } from "../shared/order.model";
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { Subject } from 'rxjs/Subject';
import { orderBody } from "../shared/order-body.model";

@Injectable()
export class orderService{
    static END_POINT = "/orders";
    constructor(private httpService:HttpService) {
    }
    readAll(): Observable<order[]> {
        return this.httpService.authToken().get(orderService.END_POINT);
    }

}


