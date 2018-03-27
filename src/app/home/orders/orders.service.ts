import { Injectable } from "@angular/core";
import { order } from "../shared/order.model";
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { Subject } from 'rxjs/Subject';
import { orderBody } from "../shared/order-body.model";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class orderService{
    static END_POINT = "/orders";
    static END_POINT_ORDERBODY = '/orderbody'
    constructor(private httpService:HttpService,public snackBar: MatSnackBar) {
    }
    readAll(): Observable<order[]> {
        return this.httpService.authToken().get(orderService.END_POINT);
    }
    readAllOrderBodyByIdOrder(code:String): Observable<orderBody[]>{
        return this.httpService.authToken().get(orderService.END_POINT_ORDERBODY +'/'+code);
    }
    createOrder(order:order):Observable<boolean>{
        return this.httpService.authToken().post(orderService.END_POINT , order).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

}


