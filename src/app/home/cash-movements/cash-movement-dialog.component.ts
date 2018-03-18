import { Component, Input } from '@angular/core';
import { CashMovement } from './cash-movement.model';
import { CashMovementService } from './cash-movement.service';

@Component({
    templateUrl: 'cash-movement-dialog.component.html',
    styles: [`.mat-dialog-content, .mat-radio-group {
        display: flex;
        flex-direction: column;
    }
    [hidden] { display: none !important;}`]
})
export class CashMovementDialogComponent {
    static URL = 'cash-movements';

    cashMovement: CashMovement = { value: 0, comment: '' };
    isChecked = false;
    isErrorValueOn = false;
    isErrorCommentOn = false;
    selectedOperation = '';
    operations = ['Add', 'Remove'];

    constructor(private cashMovementService: CashMovementService) {
    }

    createMovement() {
        if (this.selectedOperation === Operations[Operations.Add]) {
            this.cashMovement.value = Math.abs(this.cashMovement.value);
        }

        if (this.selectedOperation === Operations[Operations.Remove]) {
            this.cashMovement.value =
                (this.cashMovement.value < 0) ? this.cashMovement.value : -1 * this.cashMovement.value;
        }

        this.cashMovementService.createObservable(this.cashMovement).subscribe();
    }

    onValueChange(value: string) {
        this.isErrorValueOn = (!this.cashMovement.value || this.cashMovement.value === 0) ?
             true : false;
    }

    onCommentChange(comment: string) {
        this.isErrorCommentOn = (!this.cashMovement.comment || this.cashMovement.comment === '') ?
            true : false;
    }
}

enum Operations {
  Add,
  Remove
}
