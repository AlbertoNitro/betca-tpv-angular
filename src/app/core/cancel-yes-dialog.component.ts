import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'cancel-yes-dialog.component.html',
    styles: [`.mat-dialog-content { display: flex; flex-direction: column; }`]
})
export class CancelYesDialogComponent {
    constructor(public dialogRef: MatDialogRef<CancelYesDialogComponent>) {
    }

    yes() {
        this.dialogRef.close(true);
    }
}
