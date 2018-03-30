import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CashierMovement } from './cashier-movement.model';
import { HttpService } from '../../core/http.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CashierMovementService {
    static END_POINT = '/cashier-movements';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
    }

    public create(cashMovement: CashierMovement): Observable<any> {
        cashMovement.authorMobile = this.httpService.getMobile();
        return this.httpService.authToken().successful().post(CashierMovementService.END_POINT, cashMovement);
    }

}
