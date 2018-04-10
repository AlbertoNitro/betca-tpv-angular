import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';


@Component({
    templateUrl: 'user-quick-creation-edit-dialog.component.html',
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
export class UserQuickCreationEditDialogComponent {
    type: string;
    user: User;

    constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<UserQuickCreationEditDialogComponent>,
        private userService: UserService) {

        this.user = data.user;
        this.type = data.type;
    }


    submit(): void {
        if (this.type === 'create') {
            this.userService.create(this.user).subscribe(
                () => this.dialogRef.close(true)
            );
        } else if (this.type === 'edit') {
            this.userService.put(this.user).subscribe(
                () => this.dialogRef.close(true)
            );
        }
    }
}
