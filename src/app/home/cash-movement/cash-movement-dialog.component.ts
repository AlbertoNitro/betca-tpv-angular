import { Component } from '@angular/core';
import { CashMovement } from '../shared/cash-movement.model';

@Component({
    templateUrl: 'cash-movement-dialog.component.html',
    styles: [`.mat-dialog-content, .mat-radio-group {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashMovementDialogComponent {
    cashMovement: CashMovement = { value: 0, comment: '', selectedOperation: '' };
    isChecked = false;
    operations = [ 'Add', 'Remove'];

    constructor() {
    }

    createMovement() {
        console.log(this.cashMovement.selectedOperation);
    }
}
