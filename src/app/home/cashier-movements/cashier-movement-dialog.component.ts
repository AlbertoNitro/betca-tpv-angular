import { Component, Input } from '@angular/core';
import { CashierMovement } from './cashier-movement.model';
import { CashierMovementService } from './cashier-movement.service';
import { MatDialog } from '@angular/material';
import { CashierService } from '../shared/cashier.service';

@Component({
    templateUrl: 'cashier-movement-dialog.component.html',
    styles: [`
      .mat-dialog-content{
         display: flex;
         flex-direction: column;
      }`
    ]
})
export class CashierMovementDialogComponent {
    static URL = 'cashier-movements';

    cashierMovement: CashierMovement = { value: undefined, comment: '', authorMobile: 0 };
    selectedOperation = '';

    constructor(private dialog: MatDialog, private cashierService: CashierService) {
    }

    createMovement() {
        if (this.selectedOperation === 'subtract') {
            this.cashierMovement.value *= -1;
        }
        this.cashierService.create(this.cashierMovement).subscribe(
            () => this.dialog.closeAll()
        );
    }

    isInvalid(): boolean {
        return !this.selectedOperation || !this.cashierMovement.value || !(this.cashierMovement.value > 0) || !this.cashierMovement.comment;

    }
}
