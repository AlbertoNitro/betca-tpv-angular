import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { VoucherService } from '../../shared/voucher.service';

@Component({
    templateUrl: 'voucher-consume-dialog.component.html',
    styleUrls: ['shopping-cart.component.css']
})
export class VoucherConsumeDialogComponent {
    id: string;

    constructor(private dialogRef: MatDialogRef<VoucherConsumeDialogComponent>,
        private voucherService: VoucherService) {
    }

    consume() {
        this.voucherService.consume(this.id).subscribe(
            data => {
                this.dialogRef.close(data);
            },
            error => {
                this.dialogRef.close(0);
            }
        );
    }

}
