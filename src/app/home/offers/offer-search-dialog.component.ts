import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';
import { OfferService } from '../shared/offer.service';

@Component({
    templateUrl: 'offer-search-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
    
export class OfferSearchDialogComponent implements OnInit{      
    offer : Offer;
    code : String;
    
    constructor(  private offerService: OfferService ) {
    }
    
    ngOnInit(): void {
        if (!this.offer) {
            this.offer = {percentage: undefined, expiration: undefined , description : undefined, creationDate : undefined};
        }
    }

    searchOffer() : void {
        this.offerService.readObservable(this.code).subscribe(
            data => { data.expiration = new Date(data.expiration);
                      data.creationDate = new Date (data.creationDate);
                      this.offer = data;
            },
            error => this.offer = {creationDate : undefined, percentage: undefined, expiration: undefined , description : undefined});
    }
}
