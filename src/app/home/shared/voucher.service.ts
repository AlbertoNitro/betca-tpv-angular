import { Injectable } from '@angular/core';
import { Voucher } from './voucher.model';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class VoucherService {
    static END_POINT = '/vouchers';

    static VALID = '/valid';

    constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
    }

    create(voucher: Voucher): Observable<any> {
        return this.httpService.authToken().pdf().post(VoucherService.END_POINT, voucher);
    }

    consume(reference: string): Observable<number> {
        return this.httpService.authToken().successful('Voucher was consumed')
            .patch(VoucherService.END_POINT + '/' + reference);
    }

    readAll(): Observable<Voucher[]> {
        return this.httpService.authToken().get(VoucherService.END_POINT);
    }

    readAllValid(): Observable<Voucher[]> {
        return this.httpService.authToken().get(VoucherService.END_POINT + VoucherService.VALID);
    }

}
