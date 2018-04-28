import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {Voucher} from '../shared/voucher.model';
import {VoucherService} from '../shared/voucher.service';

@Component({
  templateUrl: 'voucher-edit-dialog.component.html',
  styleUrls: ['vouchers.component.css']
})
export class VoucherEditDialogComponent {
  voucher: Voucher;

  constructor(private dialogRef: MatDialogRef<VoucherEditDialogComponent>,
              private voucherService: VoucherService) {
  }

  consume(): void {
    this.voucherService.consume(this.voucher.id).subscribe(
      () => this.dialogRef.close()
    );
  }
}
