import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';

@Component({
    templateUrl: 'offer-create-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
    
export class OfferCreateEditDialogComponent implements OnInit{
        
    offer : Offer;
    edit : boolean;
    constructor() {
    }
    
    ngOnInit(): void {
        if (!this.offer) {
            this.offer = { code: undefined, percentage: undefined, expiration: '' , description : ''};
        }
    }

    create() {
        console.log("OfferCreatedEditDialogComponent:create()");
        console.log("Code: " + this.offer.code);
        console.log("percentage: " + this.offer.percentage);
        console.log("expiration: " + this.offer.expiration);
        console.log("description: " + this.offer.description);
    }
    
    save () {
        console.log("OfferCreatedEditDialogComponent:save()");
    }
}
