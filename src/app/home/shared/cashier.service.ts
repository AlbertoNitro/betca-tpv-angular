import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { CashierLast } from './cashier-last.model';
import { CashierClosing } from './cashier-closing.model';
import { HttpService } from '../../core/http.service';
import { ArticleService } from './article.service';
import { CashierMovement } from './cashier-movement.model';
import { ClosedCashier } from './closed-cashier.model';

@Injectable()
export class CashierService {
    static END_POINT = '/cashier-closures';
    static LAST = '/last';
    static SEARCH = '/search';
    static TOTALS = '/totals';
    static MOVEMENTS = '/movements';
    static DATE = '/date';

    constructor(private httpService: HttpService) {
    }

    last(): Observable<CashierLast> {
        return this.httpService.authToken().get(CashierService.END_POINT + CashierService.LAST);
    }

    open(): Observable<any> {
        return this.httpService.authToken().post(CashierService.END_POINT);
    }

    close(cashierClosure: CashierClosing): Observable<any> {
        return this.httpService.authToken().patch(CashierService.END_POINT + CashierService.LAST, cashierClosure);
    }

    readAllDatesBetween(dateStart: Date, dateFinish: Date): Observable<CashierClosing[]> {
        return this.httpService.authToken()
            .param('dateStart', dateStart.toISOString())
            .param('dateFinish', dateFinish.toISOString())
            .get(CashierService.END_POINT + CashierService.SEARCH);
    }

    readTotals(): Observable<CashierClosing> {
        return this.httpService.authToken().get(
            CashierService.END_POINT + CashierService.LAST + CashierService.TOTALS);
    }

    create(cashMovement: CashierMovement): Observable<any> {
        cashMovement.authorMobile = this.httpService.getMobile();
        return this.httpService.authToken().successful().post(
            CashierService.END_POINT + CashierService.LAST + CashierService.MOVEMENTS, cashMovement);
    }

    findBetweenDates(start: Date, end: Date): Observable<ClosedCashier[]> {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 0);
        return this.httpService.authToken().param('start', String(start.getTime()))
            .param('end', String(end.getTime())).get(CashierService.END_POINT + CashierService.SEARCH + CashierService.DATE);
    }

}
