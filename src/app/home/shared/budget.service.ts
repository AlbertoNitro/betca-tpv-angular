import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Budget} from './budget.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class BudgetService {
  static END_POINT = '/budgets';

  constructor(private httpService: HttpService) {
  }

  create(budget: Budget): Observable<any> {
    return this.httpService.authToken().pdf().post(BudgetService.END_POINT, budget);
  }

  readAll(): Observable<Budget[]> {
    return this.httpService.authToken().get(BudgetService.END_POINT);
  }

  read(budget: Budget): void {
    this.httpService.authToken().pdf().get(BudgetService.END_POINT + '/' + budget.id).subscribe(
      () => {
      }
    );
  }

}
