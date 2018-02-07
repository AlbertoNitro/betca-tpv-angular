import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CashierLast } from './cashier-closed/cashier-last.model';
import { Subject } from 'rxjs/Subject';
import { CashierClosure } from './cashier-opened/cashier-closure.model';

@Injectable()
export class CashierService {
    static END_POINT = '/cashier-closures';
    static LAST = '/last';

    private cashierLast: Subject<CashierLast> = new Subject();

    constructor(private httpService: HttpService, private router: Router) {
    }

    lastObservable(): Observable<CashierLast> {
        this.synchronizeLast();
        return this.cashierLast.asObservable();
    }

    synchronizeLast() {
        this.httpService.authToken().get(CashierService.END_POINT + CashierService.LAST).subscribe(
            data => this.cashierLast.next(data)
        );
    }

    open(): void {
        this.httpService.authToken().post(CashierService.END_POINT).subscribe(
            () => {
                this.synchronizeLast();
            }
        );
    }

    close(): void {
        // TODO componente de recogida de datos
        const chashierClosure: CashierClosure = { finalCash: 30, salesCard: 50, comment: 'test' };
        this.httpService.authToken().patch(CashierService.END_POINT + CashierService.LAST, chashierClosure).subscribe(
            () => {
                this.synchronizeLast();
            }
        );
    }


}
