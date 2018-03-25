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
  user: User;
  edit: boolean;
  roleKeys = Object.keys(Role); // ["ADMIN", "MANAGER", "OPERATOR", "CUSTOMER"]
  roleValues = this.roleKeys.map(k => Role[k as any]); // [ADMIN, MANAGER, OPERATOR, CUSTOMER]
  roleModels = [false, false, false, false];
  selected = [];

  items = this.roleKeys;
  userRoles: Array<Role>;

  constructor(public dialogRef: MatDialogRef<RoleManagementDialogComponent>,
    private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = { mobile: undefined, username: '' };
    }

    this.selected = this.user.address.split(',', 4);
    this.initialChecking(this.selected);
    // console.log(this.selected);
  }

  checking(): void {
    this.selected = [];
    for (const roleValue in this.roleValues) {
      if (this.roleModels[roleValue]) {
        this.selected.push(this.roleKeys[roleValue]);
      }
    }
  }

  initialChecking(roleModels: string[]): void {
    for (const roleKey in this.roleKeys) {
      if (this.selected.indexOf(this.roleKeys[roleKey]) > -1) {
        const idx = this.roleKeys.indexOf(this.roleKeys[roleKey]);
        this.roleModels[idx] = true;
      }
    }
  }

  save(): void {
    this.user.address = this.selected.toString();
    this.userService.putObservable(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }

}
