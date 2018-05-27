import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {UserCreationEditDialogComponent} from './user-creation-edit-dialog.component';
import {UserChangingPasswordDialogComponent} from './user-changing-password-dialog.component';

@Component({
  templateUrl: `users.component.html`
})
export class UsersComponent {
  static URL = 'customers';

  user: User;

  title = 'Customers management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.user = {mobile: null, username: null};
    this.data = null;
  }

  filter() {
    this.userService.find(this.user).subscribe(
      data => this.data = data
    );
  }

  resetFilter() {
    this.user = {mobile: null, username: null};
  }

  edit(user: User) {
    this.userService.read(user.mobile).subscribe(
      data => {
        const dialogRef = this.dialog.open(UserCreationEditDialogComponent);
        dialogRef.componentInstance.user = data;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
          result => this.filter()
        );
      }
    );
  }

  editPassword(user: User) {
    this.userService.read(user.mobile).subscribe(
      data => {
        this.dialog.open(UserChangingPasswordDialogComponent, {
          data: {user: data}
        }).afterClosed().subscribe(
          result => this.filter()
        );
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(UserCreationEditDialogComponent);
    dialogRef.componentInstance.edit = false;
    dialogRef.afterClosed().subscribe(
      result => this.filter()
    );
  }

}
