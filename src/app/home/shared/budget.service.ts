import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BudgetCreation } from './budget-creation.model'
import { HttpService } from '../../core/http.service';


@Injectable()
export class BudgetService {
    static END_POINT = '/budgets';

    constructor(private httpService: HttpService) {
    }

    create(budgetCreation: BudgetCreation): Observable<any> {
        return this.httpService.authToken().pdf().post(BudgetService.END_POINT, budgetCreation); 
    }

}