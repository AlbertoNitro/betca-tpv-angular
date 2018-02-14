import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../cashier-opened/user.model';
import { UserService } from '../cashier-opened/user.service';

@Component({
    templateUrl: 'user-creation-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class UserCreationDialogComponent {
    checked = false;
    user: User = { mobile: undefined, username: undefined, active: true };

    constructor(public dialogRef: MatDialogRef<UserCreationDialogComponent>, private userService: UserService) {
    }

    create(): void {
    }

    save(): void {

    }
}
