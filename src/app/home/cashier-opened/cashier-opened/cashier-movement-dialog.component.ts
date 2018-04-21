import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CashierMovement } from '../../shared/cashier-movement.model';
import { CashierService } from '../../shared/cashier.service';
import { CashierMovementService } from './cashier-movement.service';

@Component({
    templateUrl: 'cashier-movement-dialog.component.html',
    styleUrls: ['cashier-opened.component.css']
})
export class CashierMovementDialogComponent {
    static URL = 'cashier-movements';

    cashierMovement: CashierMovement = { value: undefined, comment: '', authorMobile: 0 };
    selectedOperation = '';

    constructor(private dialogRef: MatDialogRef<CashierMovementDialogComponent>, private cashierService: CashierService) {
    }

    createMovement() {
        if (this.selectedOperation === 'subtract') {
            this.cashierMovement.value *= -1;
        }
        this.cashierService.create(this.cashierMovement).subscribe(
            () => this.dialogRef.close()
        );
    }

    isInvalid(): boolean {
        return !this.selectedOperation || !this.cashierMovement.value || !(this.cashierMovement.value > 0) || !this.cashierMovement.comment;

    }
}
