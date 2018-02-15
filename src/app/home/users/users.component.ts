import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { UserCreationDialogComponent } from './user-creation-dialog.component';

@Component({
    templateUrl: `users.component.html`
})
export class UsersComponent implements OnInit {
    static URL = 'customers';

    displayedColumns = ['mobile', 'username', 'actions'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
        this.synchronize();
    }

    synchronize() {
        this.userService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<User>(data);
                this.dataSource.sort = this.sort;
            }
        );
    }

    edit(user: User) {
        const dialogRef = this.dialog.open(UserCreationDialogComponent);
        dialogRef.componentInstance.user = user;
        dialogRef.componentInstance.edit = true;
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
    }

    create() {
        const dialogRef = this.dialog.open(UserCreationDialogComponent);
        dialogRef.componentInstance.edit = false;
        dialogRef.afterClosed().subscribe(
            result => this.synchronize()
        );
   }
}
