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
        this.voucherService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<Voucher>(data);
                this.dataSource.sort = this.sort;
            
                this.totalValueVouchers = 0;

                for( var i=0; i< data.length; i++ ) {
                    if ( data[i].used == false ){
                        this.totalValueVouchers += data[i].value;
                    }
                }

            }
        );

        
    }

    create() {
        const dialogRef = this.dialog.open(VoucherCreationEditDialogComponent);
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    consume( voucher: Voucher ){

        this.voucherService.patchObservable(voucher.reference).subscribe(
            data => {
                this.synchronize();
            }
        );

    }

}
