import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-changing-password-dialog',
  templateUrl: './user-changing-password-dialog.component.html',
  styleUrls: ['./user-changing-password-dialog.component.css']
})
export class UserChangingPasswordDialogComponent implements OnInit {
  edit: boolean;
  user: User;
  newPassword: string;
  repeatPassword: string;

  constructor(public dialogRef: MatDialogRef<UserChangingPasswordDialogComponent>,
    private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = { mobile: undefined, username: '' };
    }
  }

  save(): void {
    this.userService.putObservable(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }
}
