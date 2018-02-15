import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
    templateUrl: 'user-creation-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class UserCreationDialogComponent implements OnInit {
    edit: boolean;
    user: User;

    constructor(public dialogRef: MatDialogRef<UserCreationDialogComponent>,
        private userService: UserService) {
    }

    ngOnInit(): void {
        if (!this.user) {
            this.user = { mobile: undefined, username: '' };
        }
    }

    create(): void {
        this.userService.createObservable(this.user).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.userService.putObservable(this.user).subscribe(
            data => this.dialogRef.close()
        );
    }
}