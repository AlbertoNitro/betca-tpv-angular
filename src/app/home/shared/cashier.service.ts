import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { CashierLast } from './cashier-last.model';
import { CashierClosure } from './cashier-closure.model';
import { HttpService } from '../../core/http.service';
import { ArticleService } from './article.service';

@Injectable()
export class CashierService {
    static END_POINT = '/cashier-closures';
    static LAST = '/last';
    static SEARCH = '/search?';

    private cashierLast: Subject<CashierLast> = new Subject();

    constructor(private httpService: HttpService) {
    }

    private synchronizeLast(): void {
        this.httpService.authToken().get(CashierService.END_POINT + CashierService.LAST).subscribe(
            data => this.cashierLast.next(data)
        );
    }

    lastObservable(): Observable<CashierLast> {
        this.synchronizeLast();
        return this.cashierLast.asObservable();
    }

    open(): void {
        this.httpService.authToken().post(CashierService.END_POINT).subscribe(
            () => this.synchronizeLast()
        );
    }

    close(cashierClosure: CashierClosure): void {
        this.httpService.authToken().patch(CashierService.END_POINT + CashierService.LAST, cashierClosure).subscribe(
            () => this.synchronizeLast()
        );
    }

    readAllBetweenDates(dateStart: Date, dateFinish: Date): Observable<CashierClosure[]> {
        const cpParams = new URLSearchParams();
        cpParams.append('dateStart', dateStart.toISOString());
        cpParams.append('dateFinish', dateFinish.toISOString());
        const options = new RequestOptions({ params: cpParams });
        return this.httpService.authToken().get(CashierService.END_POINT + CashierService.SEARCH + options.search);
    }
}
