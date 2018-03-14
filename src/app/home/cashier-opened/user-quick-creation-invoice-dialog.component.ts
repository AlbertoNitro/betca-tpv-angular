import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';


@Component({
    templateUrl: 'user-quick-creation-invoice-dialog.component.html',
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
export class UserQuickCreateInvoiceDialogComponent implements OnInit {
    user: User;

    constructor(public dialogRef: MatDialogRef<UserQuickCreateInvoiceDialogComponent>, private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = { mobile: 0, username: ''};
    }

}
