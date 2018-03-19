import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { UserCreationEditDialogComponent } from '../users/user-creation-edit-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  static URL = 'role-management';

  title = 'Role Management';
  columns = ['mobile', 'username', 'role'];
  data: User[];

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.synchronize();
  }

  synchronize() {
    this.userService.readAll().subscribe(
      data => this.data = data
    );
  }

  edit(user: User) {
    this.userService.readObservable(user.mobile).subscribe(
      data => {
        const dialogRef = this.dialog.open(UserCreationEditDialogComponent);
        dialogRef.componentInstance.user = data;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
          result => this.synchronize()
        );
      }
    );
  }

  read(user: User) {}

}
