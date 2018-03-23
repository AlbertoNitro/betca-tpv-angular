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
    voucher: Voucher;

    constructor(private dialogRef: MatDialogRef<VoucherCreationEditDialogComponent>,
        private voucherService: VoucherService) {
    }

    ngOnInit(): void {
        if (!this.voucher) {
            this.voucher = { value: undefined };
        }
    }

    create(): void {
        this.voucherService.createObservable(this.voucher).subscribe(
            blob => {
                this.openPdf(blob);
            }
        );
    }

    openPdf(blob: any) {
        this.dialogRef.close();
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    nonValidValue(): boolean {
        return this.voucher.value === undefined || this.voucher.value <= 0 || this.voucher.value.toString.length <= 0;
    }

}
