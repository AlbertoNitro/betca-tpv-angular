import { Component, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Offer } from '../shared/offer.model';
import { OfferService } from '../shared/offer.service';
import {FormControl} from '@angular/forms';

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
    
    constructor(public dialogRef: MatDialogRef<OfferCreateEditDialogComponent>,
        private userService: OfferService) {
    }
    
    ngOnInit(): void {
        if (!this.offer) {
            this.offer = { code: undefined, percentage: undefined, expiration:  undefined };
        } 
    }

    create() {
        console.log("OfferCreatedEditDialogComponent:create()");
        this.userService.createObservable(this.offer).subscribe(
            data => this.dialogRef.close()
        );
    }
    
    save () {
        console.log("OfferCreatedEditDialogComponent:save()");
        this.userService.putObservable(this.offer).subscribe(
            data => this.dialogRef.close()
        );
    }
}
