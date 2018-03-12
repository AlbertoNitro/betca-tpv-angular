import { Injectable } from '@angular/core';

import { BudgetCreation } from './budget-creation.model'
import { HttpService } from '../../core/http.service';


@Injectable()
export class BudgetService {
    static END_POINT = '/budgets';

    constructor(private httpService: HttpService) {
    }

    create(budgetCreation: BudgetCreation): void {
        console.log("Realizar petición a la API : /budgets con " + budgetCreation.shoppingCart.length + " articulos");
        //return this.httpService.authToken().pdf().post(BudgetService.END_POINT, budgetCreation); 
    }

}