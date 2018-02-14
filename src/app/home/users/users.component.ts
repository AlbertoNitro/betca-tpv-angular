import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { User } from '../cashier-opened/user.model';
import { UserService } from '../cashier-opened/user.service';
import { UserCreationDialogComponent } from './user-creation-dialog.component';

@Component({
    templateUrl: `users.component.html`
})
export class UsersComponent implements OnInit {
    static URL = 'customers';

    displayedColumns = ['mobile', 'username', 'email', 'actions'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<User>(data);
                this.dataSource.sort = this.sort;
            }
        );
    }

    create() {
        this.dialog.open(UserCreationDialogComponent);
    }

    edit(user: User) {
        this.dialog.open(UserCreationDialogComponent);
    }
}
