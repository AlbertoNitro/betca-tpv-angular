import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from '../shared/voucher.model';
import { VoucherService } from '../shared/voucher.service';

@Component({
    templateUrl: 'voucher-creation-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class VoucherCreationEditDialogComponent implements OnInit {
    edit: boolean;
    voucher: Voucher;

    constructor(public dialogRef: MatDialogRef<VoucherCreationEditDialogComponent>,
        private voucherService: VoucherService) {
    }

    ngOnInit(): void {
        if (!this.voucher) {
            this.voucher = { value: undefined  };
        }
    }

    create(): void {
        this.voucherService.createObservable(this.voucher).subscribe(
            data => this.dialogRef.close()
        );
    }

}
