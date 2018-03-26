import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
//import { TokenManagementDialogComponent } from './token-management-dialog.component';

@Component({
  templateUrl: './token-management.component.html'
})
export class TokenManagementComponent implements OnInit {
  static URL = 'token-management';

  title = 'Token Management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.synchronize();
  }

  synchronize() {
    this.userService.readAll().subscribe(
      data => this.data = data
    );
  }

  edit(user: User) {
    /*this.userService.readObservable(user.mobile).subscribe(
      data => {
        const dialogRef = this.dialog.open(TokenManagementDialogComponent);
        dialogRef.componentInstance.user = data;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
          result => this.synchronize()
        );
      }
    );*/
  }

  create() {
    /*const dialogRef = this.dialog.open(TokenManagementDialogComponent);
    dialogRef.componentInstance.edit = false;
    dialogRef.afterClosed().subscribe(
      result => this.synchronize()
    );*/

  }

}

