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

    readObservable(reference: number): Observable<Voucher> {
        return this.httpService.authToken().get(VoucherService.END_POINT + '/' + reference);
    }

    createObservable(voucher: Voucher): Observable<boolean> {
        return this.httpService.authToken().post(VoucherService.END_POINT, voucher).map(
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
