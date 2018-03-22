import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from './voucher.model';
import { VoucherService } from './voucher.service';

@Component({
    templateUrl: 'voucher-consume-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class VoucherConsumeDialogComponent implements OnInit {
    reference: string;

    constructor(public dialogRef: MatDialogRef<VoucherConsumeDialogComponent>,
        private voucherService: VoucherService) {
    }

    ngOnInit(): void {
    }

    consume(){

        this.voucherService.patchObservable( this.reference ).subscribe(
            data=>{
                this.dialogRef.close( data );
            }
        );

    }

}
