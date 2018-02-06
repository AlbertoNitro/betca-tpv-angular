import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LastCashier } from './last-cashier.model';
import { Subject } from 'rxjs/Subject';
import { CashierClosure } from './cashier- closure.model';

@Injectable()
export class CashierService {
    static END_POINT = '/cashier-closures';
    static LAST = '/last';

    private lastCashier: Subject<LastCashier> = new Subject();

    constructor(private httpService: HttpService, private router: Router, public snackBar: MatSnackBar) {
    }

    getCashierLast(): Observable<LastCashier> {
        this.readCashierLast();
        return this.lastCashier.asObservable();
    }

    readCashierLast() {
        this.httpService.authToken().get(CashierService.END_POINT + CashierService.LAST).subscribe(
            data => this.lastCashier.next(data),
            error => this.snackBar.open(error.message, 'Error', {
                duration: 8000
            })
        );
    }

    open(): void {
        this.httpService.authToken().post(CashierService.END_POINT).subscribe(
            () => {
                this.readCashierLast();
            },
            error => this.snackBar.open(error.message, 'Error', {
                duration: 8000
            })
        );
    }

    closeCashier(): void {
        // TODO componente de recogida de datos
        const chashierClosure: CashierClosure = { finalCash: 30, salesCard: 50, comment: 'test' };
        this.httpService.authToken().patch(CashierService.END_POINT + CashierService.LAST, chashierClosure).subscribe(
            () => {
                this.readCashierLast();
            },
            error => this.snackBar.open(error.message, 'Error', {
                duration: 8000
            })
        );
    }


}
