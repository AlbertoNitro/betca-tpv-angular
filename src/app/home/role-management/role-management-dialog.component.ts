import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  templateUrl: 'role-management-dialog.component.html',
  styleUrls: [`role-management-dialog.component.css`]
})
export class RoleManagementDialogComponent implements OnInit {
  edit: boolean;
  user: User;
  favoriteUserRole: string;

  roles = [
    'Admin',
    'Manager',
    'Operator',
    'Custormer',
  ];

  constructor(public dialogRef: MatDialogRef<RoleManagementDialogComponent>,
    private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = { mobile: undefined, username: '' };
    }
  }

  create(): void {
    this.userService.createObservable(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }

  save(): void {
    this.userService.putObservable(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }
}
