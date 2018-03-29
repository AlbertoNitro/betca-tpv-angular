import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { UserCreationEditDialogComponent } from './user-creation-edit-dialog.component';
import { UserChangingPasswordDialogComponent } from './user-changing-password-dialog.component';

@Component({
    templateUrl: `users.component.html`
})
export class UsersComponent implements OnInit {
    static URL = 'customers';

    title = 'Customers management';
    columns = ['mobile', 'username'];
    data: User[];

    constructor(private dialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        this.userService.readAll().subscribe(
            data => this.data = data
        );
    }

    edit(user: User) {
        this.userService.readObservable(user.mobile).subscribe(
            data => {
                const dialogRef = this.dialog.open(UserCreationEditDialogComponent);
                dialogRef.componentInstance.user = data;
                dialogRef.componentInstance.edit = true;
                dialogRef.afterClosed().subscribe(
                    result => this.synchronize()
                );
            }
        );
    }

    edit2(user: User) {
        this.userService.readObservable(user.mobile).subscribe(
            data => {
                const dialogRef = this.dialog.open(UserChangingPasswordDialogComponent);
                dialogRef.componentInstance.user = data;
                dialogRef.componentInstance.edit = true;
                dialogRef.afterClosed().subscribe(
                    result => this.synchronize()
                );
            }
        );
    }

    create() {
        const dialogRef = this.dialog.open(UserCreationEditDialogComponent);
        dialogRef.componentInstance.edit = false;
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

}
