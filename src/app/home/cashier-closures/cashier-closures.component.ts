import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ClosedCashier } from '../shared/closed-cashier.model';
import { CashierService } from '../shared/cashier.service';


@Component({
    templateUrl: `cashier-closures.component.html`
})
export class CashierClosuresComponent {
    static URL = 'cashier-closures';

    title = 'Cashier Closures management';
    columns = ['openingDateFormat', 'initialCash', 'salesCash', 'salesCard', 'deposit', 'withdrawal', 'comment'];
    data: ClosedCashier[];

    initialDateInput: Date = undefined;
    finalDateInput: Date = new Date();

    constructor(private dialog: MatDialog, private cashierService: CashierService) {
    }

    findCashierCreationDatesBetween() {
        this.cashierService.findBetweenDates(this.initialDateInput, this.finalDateInput).subscribe(
            (cashierClosureClosedList: ClosedCashier[]) => {
                this.data = cashierClosureClosedList;
                this.data.forEach(element =>
                    element['openingDateFormat'] = new Date(element['openingDate']).toISOString().substring(0, 9)
                );
            }
        );
    }


}
