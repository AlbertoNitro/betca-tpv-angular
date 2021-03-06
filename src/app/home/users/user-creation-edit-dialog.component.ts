import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';

@Component({
  templateUrl: 'user-creation-edit-dialog.component.html',
  styleUrls: ['users.component.css']
})
export class UserCreationEditDialogComponent implements OnInit {
  edit: boolean;
  user: User;

  constructor(public dialogRef: MatDialogRef<UserCreationEditDialogComponent>,
              private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.user) {
      this.user = {mobile: undefined, username: ''};
    }
  }

  create(): void {
    this.userService.create(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }

  save(): void {
    this.userService.put(this.user).subscribe(
      data => this.dialogRef.close()
    );
  }
}
