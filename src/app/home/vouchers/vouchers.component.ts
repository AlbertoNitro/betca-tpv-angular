import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Voucher } from '../shared/voucher.model';
import { VoucherService } from '../shared/voucher.service';
import { VoucherCreationEditDialogComponent } from './voucher-creation-edit-dialog.component';

@Component({
    templateUrl: `vouchers.component.html`
})
export class VouchersComponent implements OnInit {
    static URL = 'vouchers';

    title = 'Vouchers management';
    columns = ['reference', 'value', 'dateOfUse'];
    data: Voucher[];

    validVoucher = true;

    constructor(private dialog: MatDialog, private voucherService: VoucherService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        if (this.validVoucher) {
            this.voucherService.readAllValid().subscribe(
                data => {
                    this.data = data;
                    this.title = 'Vouchers management. Total: ' + this.calculateTotal(data) + ' €';
                }
            );
        } else {
            this.voucherService.readAll().subscribe(
                data => {
                    this.data = data;
                    this.title = 'Vouchers management';
                }
            );
        }
    }


    calculateTotal(data): number {
        let totalValueVouchers = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].used === false) {
                totalValueVouchers += data[i].value;
            }
        }
        return totalValueVouchers;
    }

    create() {
        const dialogRef = this.dialog.open(VoucherCreationEditDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    edit(voucher: Voucher) {
        if (!voucher.dateOfUse) {
            this.voucherService.consume(voucher.reference).subscribe(
                data => this.synchronize()
            );
        }
    }
}
