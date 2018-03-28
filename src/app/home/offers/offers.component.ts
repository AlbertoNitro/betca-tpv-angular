import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Offer } from '../shared/offer.model';
import { OfferService } from '../shared/offer.service';
import { OfferCreateEditDialogComponent } from './offer-create-edit-dialog.component';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    templateUrl: `offers.component.html`
})
    
export class OffersComponent implements OnInit {
    static URL = 'offers';

    columns = ['code', 'percentage', 'creationDate', 'expiration', 'description'];
    dataSource: MatTableDataSource<Offer>;
     
    constructor(private dialog: MatDialog, private offerService: OfferService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {   
        this.offerService.readAll().subscribe(
             data => this.dataSource = new MatTableDataSource<Offer>(data)
        );
    }

    edit(offer: Offer) {
        const dialogRef = this.dialog.open(OfferCreateEditDialogComponent);
        dialogRef.componentInstance.edit = true;
        dialogRef.componentInstance.offer = offer;    
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    create() {
        const dialogRef = this.dialog.open(OfferCreateEditDialogComponent);
        dialogRef.componentInstance.edit = false;
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }
    
    delete(offer : Offer ) {
       this.offerService.deleteObservable(offer).subscribe(
            result => this.synchronize()
       );
    }
}
