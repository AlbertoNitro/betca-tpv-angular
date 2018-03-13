import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Voucher } from './voucher.model';
import { VoucherService } from './voucher.service';
import { VoucherCreationEditDialogComponent } from './voucher-creation-edit-dialog.component';

@Component({
    templateUrl: `vouchers.component.html`
})
export class VouchersComponent implements OnInit {
    static URL = 'vouchers';
    totalValueVouchers: number;

    displayedColumns = ['reference', 'value', 'actions'];
    dataSource: MatTableDataSource<Voucher>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog, private voucherService: VoucherService) {
    }
    
    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
       /* this.voucherService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Voucher>(data);
                this.dataSource.sort = this.sort;
            }
        );*/
        this.dataSource = new MatTableDataSource<Voucher>(this.testVoucher);
        this.totalValueVouchers = 0;

        for( var i=0; i<this.testVoucher.length; i++ ) {
            if ( this.testVoucher[i].used == false ){
                this.totalValueVouchers += this.testVoucher[i].value;
            }
        }
    }

    create() {
        const dialogRef = this.dialog.open(VoucherCreationEditDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    consume( voucher: Voucher ){
        voucher.used = true;
        this.synchronize();
    }

    testVoucher: Voucher[] = [
        {reference: '1', value: 11, used: false},
        {reference: '2', value: 22, used: true},
        {reference: '3', value: 33, used: false}
      ];

}
