import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Role } from '../../core/role.model';

@Component({
  templateUrl: 'role-management-dialog.component.html',
  styleUrls: [`role-management-dialog.component.css`]
})
export class RoleManagementDialogComponent implements OnInit {
  edit: boolean;
  user: User;
  favoriteUserRole: string;

  roles = [this.capitalizeFirstLetter(Role['ADMIN']),
  this.capitalizeFirstLetter(Role['MANAGER']),
  this.capitalizeFirstLetter(Role['OPERATOR'])
  ];

  constructor(public dialogRef: MatDialogRef<RoleManagementDialogComponent>,
    private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = { mobile: undefined, username: '' };
    }
  }

  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
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
