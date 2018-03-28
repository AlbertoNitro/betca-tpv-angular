import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';


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
export class UserQuickCreationDialogComponent {
    user: User;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<UserQuickCreationDialogComponent>,
        private userService: UserService) {

        this.user = { mobile: data.mobile, username: '' };
    }


    create(): void {
        this.userService.create(this.user).subscribe(
            data => this.dialogRef.close(true),
            error => this.dialogRef.close()
        );

    }
}
