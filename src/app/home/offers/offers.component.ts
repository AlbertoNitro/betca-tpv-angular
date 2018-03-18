import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Offer } from '../shared/offer.model';
import { OfferService } from '../shared/offer.service';
import { CreateOfferDialogComponent } from './create-offer-dialog.component';

@Component({
    templateUrl: `offers.component.html`
})
    
export class OffersComponent implements OnInit {
    static URL = 'offers';

    title = 'Offer management';
    columns = ['code', 'percentage', 'expiration', 'description'];
    data: Offer[];
 
    constructor(private dialog: MatDialog, private offerService: OfferService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {   
        /*
        this.offerService.readAll().subscribe(
            data => this.data = data
        );
        */
       this.data = [ { code: 1, percentage: 20 , expiration : "ddd", description: "ll"}]
    }

    edit(/*offer: Offer*/) {
    }

    create() {
        const dialogRef = this.dialog.open(CreateOfferDialogComponent);
        //dialogRef.componentInstance.edit = false;
        /*
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
        */      
    }

}
