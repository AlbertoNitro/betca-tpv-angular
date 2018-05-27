import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Voucher} from './voucher.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class VoucherService {
  static END_POINT = '/vouchers';

  static VALID = '/valid';

  constructor(private httpService: HttpService) {
  }

  create(voucher: Voucher): Observable<any> {
    return this.httpService.authToken().pdf().post(VoucherService.END_POINT, voucher);
  }

  read(id: String) {
    return this.httpService.authToken().get(VoucherService.END_POINT + '/' + id);
  }

  consume(id: string): Observable<number> {
    return this.httpService.authToken().successful('Voucher was consumed')
      .patch(VoucherService.END_POINT + '/' + id);
  }

  readAll(): Observable<Voucher[]> {
    return this.httpService.authToken().get(VoucherService.END_POINT);
  }

  readAllValid(): Observable<Voucher[]> {
    return this.httpService.authToken().get(VoucherService.END_POINT + VoucherService.VALID);
  }

}
