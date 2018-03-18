import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';

@Component({
    templateUrl: 'create-offer-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
    
export class CreateOfferDialogComponent implements OnInit{
        
    offer : Offer;

    constructor() {
    }
    
    ngOnInit(): void {
        if (!this.offer) {
            this.offer = { code: undefined, percentage: undefined, expiration: '' , description : ''};
        }
    }

    createOffer() {
        console.log("Code: " + this.offer.code);
        console.log("percentage: " + this.offer.percentage);
        console.log("expiration: " + this.offer.expiration);
        console.log("description: " + this.offer.description);
    }
}
