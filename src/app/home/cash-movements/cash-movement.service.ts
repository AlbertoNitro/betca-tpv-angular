import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CashMovement } from './cash-movement.model';
import { HttpService } from '../../core/http.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CashMovementService {
    static END_POINT = '/cash-movements';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
    }

    public createObservable(cashMovement: CashMovement): Observable<any> {
        return this.httpService.authToken().post(CashMovementService.END_POINT, cashMovement).map(
            data => {
                this.successful();
            }
        );
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }
}
