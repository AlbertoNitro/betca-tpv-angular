import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {CashierMovement} from '../../shared/cashier-movement.model';
import {HttpService} from '../../../core/http.service';

@Injectable()
export class CashierMovementService {
  static END_POINT = '/cashier-movements';

  constructor(private httpService: HttpService) {
  }

  public create(cashMovement: CashierMovement): Observable<any> {
    cashMovement.authorMobile = this.httpService.getMobile();
    return this.httpService.authToken().successful().post(CashierMovementService.END_POINT, cashMovement);
  }

}
