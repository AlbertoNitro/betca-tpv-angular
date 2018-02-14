import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { User } from '../cashier-opened/user.model';
import { UserService } from '../cashier-opened/user.service';

@Component({
    templateUrl: `customers.component.html`
})
export class CustomersComponent implements OnInit {
    static URL = 'customers';

    displayedColumns = ['mobile', 'username', 'email', 'actions'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.readAll().subscribe(
            data => {
                this.dataSource = new MatTableDataSource<User>(data);
                this.dataSource.sort = this.sort;
            }
        );
    }

}
