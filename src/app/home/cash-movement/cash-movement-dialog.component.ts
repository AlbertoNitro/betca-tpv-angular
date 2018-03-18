import { Component, Input } from '@angular/core';
import { CashMovement } from './cash-movement.model';
import { CashMovementService } from './cash-movement.service';

@Component({
    templateUrl: 'cash-movement-dialog.component.html',
    styles: [`.mat-dialog-content, .mat-radio-group {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashMovementDialogComponent {
    cashMovement: CashMovement = { value: 0, comment: '' };
    isChecked = false;
    selectedOperation = '';
    operations = ['Add', 'Remove'];

    constructor(private cashMovementService: CashMovementService) {
    }

    createMovement() {
        if (this.selectedOperation === Operations[Operations.Add]) {
            this.cashMovementService.add(this.cashMovement);
        }
        if (this.selectedOperation === Operations[Operations.Remove]) {
            this.cashMovementService.remove(this.cashMovement);
        }
    }
}

enum Operations {
  Add,
  Remove
}
