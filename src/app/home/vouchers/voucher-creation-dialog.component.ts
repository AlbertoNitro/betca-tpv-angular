import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {Voucher} from '../shared/voucher.model';
import {VoucherService} from '../shared/voucher.service';

@Component({
  templateUrl: 'voucher-creation-dialog.component.html',
  styleUrls: ['vouchers.component.css']
})
export class VoucherCreationDialogComponent {
  voucher: Voucher = {value: undefined};

  constructor(private dialogRef: MatDialogRef<VoucherCreationDialogComponent>,
              private voucherService: VoucherService) {
  }

  nonValidValue(): boolean {
    return this.voucher.value === undefined || this.voucher.value <= 0 || this.voucher.value.toString.length <= 0;
  }

  create(): void {
    this.voucherService.create(this.voucher).subscribe(
      () => this.dialogRef.close()
    );
  }
}
