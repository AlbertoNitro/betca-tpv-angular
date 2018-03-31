import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CashierClosureClosed } from './cashier-closure-closed.model';
import { CashierService } from '../shared/cashier.service';


@Component({
    templateUrl: `cashier-closures.component.html`
})
export class CashierClosuresComponent {
    static URL = 'cashier-closures';

    title = 'Cashier Closures management';
    columns = ['openingDate', 'salesCash', 'deposit', 'withdrawal', 'comment'];
    data: CashierClosureClosed[];

    initialDateInput: Date = undefined;
    finalDateInput: Date = new Date();

    constructor(private dialog: MatDialog, private cashierService: CashierService) {
    }

    findCashierCreationDatesBetween() {
        this.cashierService.findBetweenDates(this.initialDateInput, this.finalDateInput).subscribe(
            (cashierClosureClosedList: CashierClosureClosed[]) => this.data = cashierClosureClosedList
        );
    }


}
