import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { CancelYesDialogComponent } from '../../core/cancel-yes-dialog.component';

@Component({
  templateUrl: './token-management.component.html'
})
export class TokenManagementComponent implements OnInit {
  static URL = 'token-management';

  title = 'Token Management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  clearTokens() {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          //do stuff
        }
      });
  }

  private successful() {
    this.snackBar.open('Configuration updated', 'OK', {
        duration: 2000
    });
}

  lifetime = [
    {value: '1', viewValue: '1 min'},
    {value: '60', viewValue: '1 hour'},
    {value: '720', viewValue: '12 hours'},
    {value: '1440', viewValue: '24 hours'}
  ];

}

