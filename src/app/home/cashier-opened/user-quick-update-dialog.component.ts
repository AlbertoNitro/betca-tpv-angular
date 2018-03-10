import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';


@Component({
    templateUrl: 'user-quick-update-dialog.component.html',
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
export class UserQuickUpdateDialogComponent implements OnInit {
    @Input() mobile: number;
    user: User;

    constructor(public dialogRef: MatDialogRef<UserQuickUpdateDialogComponent>, private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = { mobile: this.mobile, username: '', dni: '' };
    }

}
