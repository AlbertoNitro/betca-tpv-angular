import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { User } from './user.model';
import { UserService } from './user.service';


@Component({
    templateUrl: 'user-quick-creation-dialog.component.html',
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
export class UserQuickCreationDialogComponent implements OnInit {
    @Input() mobile: number;
    user: User;

    constructor(public dialogRef: MatDialogRef<UserQuickCreationDialogComponent>, private userService: UserService) {
    }

    ngOnInit(): void {
        this.user = { mobile: this.mobile, username: '' };
    }

    create(): void {
        this.dialogRef.close(this.userService.create(this.user));
    }
}
