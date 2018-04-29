import {Component} from '@angular/core';

import {ClosedCashier} from '../shared/closed-cashier.model';
import {CashierService} from '../shared/cashier.service';

@Component({
  templateUrl: 'cashier-closures.component.html'
})
export class CashierClosuresComponent {
  static URL = 'cashier-closures';

  title = 'Cashier Closures management';
  columns = ['openingDateFormat', 'initialCash',
    'usedVouchers', 'salesCard', 'salesCash', 'salesTotal',
    'deposit', 'withdrawal', 'finalCash', 'comment'];
  data: ClosedCashier[];

  initialDateInput: Date = undefined;
  finalDateInput: Date = new Date();

  constructor(private cashierService: CashierService) {
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() - 10);
    this.synchronize(initialDate, new Date());
  }

  synchronize(initial: Date, final: Date) {
    this.cashierService.findBetweenDates(initial, final).subscribe(
      (cashierClosureClosedList: ClosedCashier[]) => {
        this.data = cashierClosureClosedList;
        this.data.forEach(element => {
            element['openingDateFormat'] = new Date(element['openingDate']).toISOString().substring(0, 10);
            element['salesTotal'] = element['usedVouchers'] + element['salesCard'] + element['salesCash'];
          }
        );
      }
    );
  }

  findCashierCreationDatesBetween() {
    this.synchronize(this.initialDateInput, this.finalDateInput);
  }


  currentMonth() {
    const initial = new Date();
    initial.setDate(1);
    this.synchronize(initial, new Date());
  }

  currentYear() {
    const initial = new Date();
    initial.setDate(1);
    initial.setMonth(0);
    this.synchronize(initial, new Date());
  }

}
