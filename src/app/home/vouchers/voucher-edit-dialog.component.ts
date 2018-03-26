import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from '../shared/voucher.model';
import { VoucherService } from '../shared/voucher.service';

@Component({
    templateUrl: 'voucher-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class VoucherEditDialogComponent {
    voucher: Voucher;

    constructor(private dialogRef: MatDialogRef<VoucherEditDialogComponent>,
        private voucherService: VoucherService) {
    }

    nonValidValue(): boolean {
        return this.voucher.value === undefined || this.voucher.value <= 0 || this.voucher.value.toString.length <= 0;
    }

    consume(): void {
        this.voucherService.consume(this.voucher.reference).subscribe(
            () => this.dialogRef.close()
        );
    }
}
