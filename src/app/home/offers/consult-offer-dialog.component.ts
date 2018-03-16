import { Component } from '@angular/core';

@Component({
    templateUrl: 'consult-offer-dialog.component.html',
  styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ConsultOfferDialogComponent {
    constructor() {
    }

    consultOffer() {
        console.log("Consult offer");
    }
}
