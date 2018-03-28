import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
    templateUrl: 'user-quick-update-invoice-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }
    .column{
        display: flex;
        flex-direction: column;
    }
    `]
})
export class UserQuickUpdateInvoiceDialogComponent implements OnInit {
    @Input() mobile: number;
    user: User;

    constructor(public dialogRef: MatDialogRef<UserQuickUpdateInvoiceDialogComponent>, private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = { mobile: this.mobile, username: this.user.username };
    }

    putUser(): void {
        this.userService.putObservable(this.user).subscribe(
            data => this.dialogRef.close(true),
            error => this.dialogRef.close()
        );
    }

}
