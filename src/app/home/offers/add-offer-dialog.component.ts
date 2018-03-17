import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';

@Component({
    templateUrl: 'add-offer-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
    
export class AddOfferDialogComponent implements OnInit{
        
    offer : Offer;
    
    constructor() {
    }
    
    ngOnInit(): void {
        if (!this.offer) {
            this.offer = { code: undefined, percentage: undefined, expiration: '' , description : ''};
        }
    }

    addOffer() {
        console.log("Code: " + this.offer.code);
        console.log("percentage: " + this.offer.percentage);
        console.log("expiration: " + this.offer.expiration);
        console.log("description: " + this.offer.description);
    }
}
