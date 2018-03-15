import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Budget } from './budget.model';
import { HttpService } from '../../core/http.service';


@Injectable()
export class BudgetService {
    static END_POINT = '/budgets';

    constructor(private httpService: HttpService) {
    }

    create(budget: Budget): Observable<any> {
        return this.httpService.authToken().pdf().post(BudgetService.END_POINT, budget);
    }

    readAll(): Budget[] {
        const data = [
            {id: '1234', shoppingCart: null},
            {id: '5678', shoppingCart: null},
            {id: '9191', shoppingCart: null}
        ];
        return data;
    }

}
