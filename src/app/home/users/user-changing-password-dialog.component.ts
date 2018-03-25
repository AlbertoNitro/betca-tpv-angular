import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-changing-password-dialog',
  templateUrl: './user-changing-password-dialog.component.html',
  styleUrls: ['./user-changing-password-dialog.component.css']
})
export class UserChangingPasswordDialogComponent {
  mobile: number;
  password: string;
  newPassword: string;
  repeatPassword: string;
}
