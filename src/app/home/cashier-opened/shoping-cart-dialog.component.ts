import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
    templateUrl: 'shopping-cart-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ShoppingCartDialogComponent {

    //@Input() code;
    public code;
    constructor(
        public dialogRef: MatDialogRef<ShoppingCartDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.code = data;
            console.log(this.code);
        }

}
