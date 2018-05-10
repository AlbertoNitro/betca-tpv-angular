import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  templateUrl: 'user-changing-password-dialog.component.html',
  styleUrls: ['users.component.css']
})
export class UserChangingPasswordDialogComponent {

  user: User;
  confirmPassword: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<UserChangingPasswordDialogComponent>,
              private userService: UserService) {

    this.user = data.user;
    this.user.password = null;
  }

  isPasswordInvalid(): boolean {
    return ((this.user.password !== this.confirmPassword));
  }

  save(): void {
    this.userService.updateProfile(this.user).subscribe(
      () => this.dialogRef.close()
    );
  }
}
