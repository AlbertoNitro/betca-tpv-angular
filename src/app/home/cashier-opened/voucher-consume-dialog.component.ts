import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from '../shared/voucher.model';
import { VoucherService } from '../shared/voucher.service';

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

    consume() {
        this.voucherService.consume(this.reference).subscribe(
            data => {
                this.dialogRef.close(data);
            },
            error => {
                this.dialogRef.close(0);
            }
        );
    }

}
