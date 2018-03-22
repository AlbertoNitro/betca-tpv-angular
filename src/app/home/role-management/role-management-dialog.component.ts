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
  roleValues = this.roleKeys.map(k => Role[k as any]); // [0, 1, 2, 3]

  // user: User = {mobile: 686573341, username: 'Karlos'};
  items = this.roleKeys;
  userRoles: Array<Role>;


  selected = [];

  constructor(public dialogRef: MatDialogRef<RoleManagementDialogComponent>,
    private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = { mobile: undefined, username: '' };
    }
  }

  changeUserRoles() {
    this.userRoles = [Role.ADMIN];
  }

  toggle(item: string, list: string[]): void {
    const idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(item);
    }
  }

  exists(item, list): boolean {
    return list.indexOf(item) > -1;
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
