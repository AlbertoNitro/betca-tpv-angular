import { Injectable } from '@angular/core';
import { Voucher } from './voucher.model';

import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class VoucherService {
    static END_POINT = '/vouchers';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
    }

    readObservable(reference: string): Observable<Voucher> {
        return this.httpService.authToken().get(VoucherService.END_POINT + '/' + reference);
    }

    createObservable(voucher: Voucher): Observable<any> {
        return this.httpService.authToken().pdf().post(VoucherService.END_POINT, voucher);
    }

    patchObservable(reference: string): Observable<boolean> {
        return this.httpService.authToken().patch(VoucherService.END_POINT + '/' + reference).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    readAll(): Observable<Voucher[]> {
        return this.httpService.authToken().get(VoucherService.END_POINT);
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }


}
