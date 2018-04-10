import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { AbstractControl } from '@angular/forms';
import { AdminsService } from '../admin/admins.service';

@Component({
  templateUrl: './user-changing-password-dialog.component.html',
  styleUrls: ['./user-changing-password-dialog.component.css']
})
export class UserChangingPasswordDialogComponent {

  user: User;
  confirmPassword: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialogRef: MatDialogRef<UserChangingPasswordDialogComponent>,
    private adminsService: AdminsService) {

    this.user = data.user;
    this.user.password = null;
  }

  isPasswordInvalid(): boolean {
    return ((this.user.password !== this.confirmPassword));
  }

  save(): void {
    this.adminsService.updateProfile(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }
}
