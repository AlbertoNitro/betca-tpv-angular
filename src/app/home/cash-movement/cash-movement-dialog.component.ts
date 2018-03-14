import { Component } from '@angular/core';
import { CashMovement } from '../shared/cash-movement.model';
import { CashMovementService } from '../shared/cash-movement.service';

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
    operations = ['Add', 'Remove'];

    constructor(private cashMovementService: CashMovementService) {
    }

    createMovement() {
        if (this.cashMovement.selectedOperation === Operations[Operations.Add]) {
            this.cashMovementService.add(this.cashMovement);
        }
        if (this.cashMovement.selectedOperation === Operations[Operations.Remove]) {
            this.cashMovementService.remove(this.cashMovement);
        }
    }
}

enum Operations {
  Add,
  Remove
}
