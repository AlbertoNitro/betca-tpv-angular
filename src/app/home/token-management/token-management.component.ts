import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { CancelYesDialogComponent } from '../../core/cancel-yes-dialog.component';
import { Token } from '../../core/token.model';
import { HttpService } from '../../core/http.service';

@Component({
  templateUrl: './token-management.component.html'
})
export class TokenManagementComponent implements OnInit {
  static URL = 'token-management';

  title = 'Token Management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private dialog: MatDialog, public snackBar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit() {
  }

  clearTokens() {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.httpService.getToken().lifetime = 0;
          this.snackBar.open('Session token expired!', 'OK', {
            duration: 2000
          });
        }
      });
  }

  private successful() {
    this.snackBar.open('Configuration updated', 'OK', {
        duration: 2000
    });
}

  lifetime = [
    {value: this.httpService.getToken().lifetime, viewValue: this.httpService.getToken().lifetime/3600000} //Displays the token lifetime in hours
  ];

}

