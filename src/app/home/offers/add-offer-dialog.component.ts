import { Component } from '@angular/core';

@Component({
    templateUrl: 'add-offer-dialog.component.html',
  styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class AddOfferDialogComponent {
    constructor() {
    }

    addOffer() {
        console.log("Add offer");
    }
}
